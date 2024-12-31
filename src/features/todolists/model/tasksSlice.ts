import { Dispatch } from "redux"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
import { setAppStatus } from "app/appSlice"
import { ResultCode } from "common/enums/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { createSlice } from "@reduxjs/toolkit"
import { addTodolist, removeTodolist } from "./todolistsSlice"
import { authSlice } from "../../auth/model/authSlice"
import { selectTasks } from "app/appSelectors"

export type TasksType = {
    [key: string]: DomainTask[]
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {} as TasksType,
    reducers: create => ({
        setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        }),
        removeTask: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) {
                tasks.splice(index, 1)
            }
        }),
        addTask: create.reducer<{ task: DomainTask }>((state, action) => {
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift(action.payload.task)
        }),
        updateTask: create.reducer<{
            task: DomainTask
        }>((state, action) => {
            const tasks = state[action.payload.task.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.task.id)
            if (index !== -1) {
                tasks[index] = action.payload.task
            }
        }),
        clearTasks: create.reducer(() => {
            return {}
        }),
    }),
    extraReducers: builder => {
        builder
            // 1 аргумент - action creator, который мы хотим обработать
            // 2 аргумент - reducer, в котором изменяем state
            .addCase(addTodolist, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(removeTodolist, (state, action) => {
                delete state[action.payload.id]
            })
    },
})

export const { setTasks, addTask, clearTasks, removeTask, updateTask } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

//Thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    tasksApi
        .getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasks({ todolistId, tasks }))
            dispatch(setAppStatus({status: "succeeded"}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    tasksApi
        .deleteTask(arg)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(removeTask(arg))
                dispatch(setAppStatus({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    tasksApi
        .createTask(arg)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(addTask({ task: res.data.data.item }))
                dispatch(setAppStatus({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTaskTC = (arg: { task: DomainTask }) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    const task = arg.task
    const model: UpdateTaskModel = {
        status: task.status,
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
    }

    tasksApi
        .updateTask({ taskId: task.id, todolistId: task.todoListId, model })
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(updateTask({ task: res.data.data.item }))
                dispatch(setAppStatus({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
