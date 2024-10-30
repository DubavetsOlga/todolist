import { TodolistType } from '../App'
import { v1 } from 'uuid'
import { FilterValuesType } from '../Todolist'

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType

export const todolistsReducer = (state: TodolistType[], action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [{ id: action.payload.id, title: action.payload.title }, ...state];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl));
        }
        default:
            return state
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', payload: { id } } as const
}

export const addTodolistAC = (id: string, title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', payload: { id, title } } as const
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload: { id, title } } as const
}
