import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import { Dispatch } from "redux"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
import { setAppStatusAC } from "app/app-reducer"
import { ResultCode } from "common/enums/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"

export type TasksType = {
    [key: string]: DomainTask[]
}

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case "SET-TASKS": {
            const stateCopy = { ...state }
            stateCopy[action.payload.todolistId] = action.payload.tasks
            return stateCopy
        }
        case "REMOVE_TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(
                    (t) => t.id !== action.payload.taskId,
                ),
            }
        case "ADD_TASK":
            const newTask = action.payload.task
            return { ...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]] }
        case "UPDATE_TASK":
            return {
                ...state,
                [action.payload.task.todoListId]: state[action.payload.task.todoListId].map((t) =>
                    t.id === action.payload.task.id ? action.payload.task : t,
                ),
            }
        case "REMOVE_TODOLIST": {
            const newState = { ...state }
            delete newState[action.payload.id]
            return newState
        }
        case "ADD_TODOLIST": {
            return { ...state, [action.payload.todolist.id]: [] }
        }
        default:
            return state
    }
}

// Action creators
export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
    return { type: "REMOVE_TASK", payload } as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
    return { type: "ADD_TASK", payload } as const
}

export const updateTaskAC = (payload: { task: DomainTask }) => {
    return { type: "UPDATE_TASK", payload } as const
}

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
    return {
        type: "SET-TASKS",
        payload,
    } as const
}

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export type SetTasksAC = ReturnType<typeof setTasksAC>

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTasksAC

//Thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi
        .getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC({ todolistId, tasks }))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi
        .deleteTask(arg)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(removeTaskAC(arg))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi
        .createTask(arg)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(addTaskAC({ task: res.data.data.item }))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTaskTC = (arg: { task: DomainTask }) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
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
                dispatch(updateTaskAC({ task: res.data.data.item }))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
