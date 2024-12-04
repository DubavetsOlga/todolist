import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import { Dispatch } from "redux"
import { tasksApi } from "../api/tasksApi"
import { DomainTask } from "../api/tasksApi.types"
import { TaskPriority, TaskStatus } from "common/enums/enums"

export type TasksType = {
    [key: string]: DomainTask[]
}

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'SET-TASKS': {
            const stateCopy = { ...state }
            stateCopy[action.payload.todolistId] = action.payload.tasks
            return stateCopy
        }
        case "REMOVE_TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
            }
        case "ADD_TASK":
            const newTask: DomainTask = {
                title: action.payload.title,
                todoListId: action.payload.todolistId,
                startDate: '',
                priority: TaskPriority.Low,
                description: '',
                deadline: '',
                status: TaskStatus.New,
                addedDate: '',
                order: 0,
                id: action.payload.id,
            }
            return { ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] }
        case "CHANGE_TASK_STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
                    t.id === action.payload.id ? { ...t, isDone: action.payload.taskStatus } : t,
                ),
            }
        case "CHANGE_TASK_TITLE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
                    t.id === action.payload.id ? { ...t, title: action.payload.title } : t,
                ),
            }
        case "REMOVE_TODOLIST": {
            const newState = { ...state }
            delete newState[action.payload.id]
            return newState
        }
        case "ADD_TODOLIST": {
            return { ...state, [action.payload.id]: [] }
        }
        default:
            return state
    }
}

// Action creators
export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
    return { type: "REMOVE_TASK", payload } as const
}

export const addTaskAC = (payload: { title: string; id: string; todolistId: string }) => {
    return { type: "ADD_TASK", payload } as const
}

export const changeTaskStatusAC = (payload: { id: string; todolistId: string; taskStatus: boolean }) => {
    return { type: "CHANGE_TASK_STATUS", payload } as const
}

export const changeTaskTitleAC = (payload: { id: string; todolistId: string; title: string }) => {
    return { type: "CHANGE_TASK_TITLE", payload } as const
}

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
    return {
        type: 'SET-TASKS',
        payload,
    } as const
}

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksAC = ReturnType<typeof setTasksAC>

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTasksAC

//Thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId).then(res => {
        const tasks = res.data.items
        dispatch(setTasksAC({ todolistId, tasks }))
    })
}

export const removeTaskTC =
    (arg: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
        tasksApi.deleteTask(arg).then(() => {
            dispatch(removeTaskAC(arg))
        })
    }

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
    tasksApi.createTask(arg).then(res => {
        // самостоятельно
    })
}
