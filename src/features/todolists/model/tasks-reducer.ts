import { TasksStateType } from "app/App"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.id),
            }
        case "ADD_TASK":
            const newTask = {
                id: action.payload.id,
                title: action.payload.title,
                isDone: false,
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
export const removeTaskAC = (payload: { id: string; todolistId: string }) => {
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

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
