import { TasksStateType } from "../App"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id) }
        case 'ADD-TASK':
            const newTask = {
                id: action.payload.id,
                title: action.payload.title,
                isDone: false
            }
            return { ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId]
                        .map(t => (t.id == action.payload.id ? { ...t, isDone: action.payload.taskStatus } : t)),
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId]
                        .map(t => (t.id == action.payload.id ? { ...t, title: action.payload.title } : t)),
            }
        case 'REMOVE-TODOLIST': {
            const newState = { ...state }
            delete newState[action.payload.id];
            return newState
        }
        case 'ADD-TODOLIST': {
            return { ...state, [action.payload.id]: [] };
        }
        default:
            return state
    }
}

// Action creators
export const removeTaskAC = (payload: { id: string; todolistId: string }) => {
    return { type: 'REMOVE-TASK', payload } as const
}

export const addTaskAC = (payload: { title: string, id: string, todolistId: string }) => {
    return { type: 'ADD-TASK', payload } as const
}

export const changeTaskStatusAC = (payload: { id: string, todolistId: string, taskStatus: boolean }) => {
    return { type: 'CHANGE-TASK-STATUS', payload } as const
}

export const changeTaskTitleAC = (payload: { id: string, todolistId: string, title: string }) => {
    return { type: 'CHANGE-TASK-TITLE', payload } as const
}

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
