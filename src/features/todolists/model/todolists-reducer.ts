import { TodolistType } from '../../../app/App'

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD_TODOLIST': {
            return [{ id: action.payload.id, title: action.payload.title }, ...state];
        }
        case 'CHANGE_TODOLIST_TITLE': {
            return state.map(tl => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl));
        }
        default:
            return state
    }
}

// Action creators
export const removeTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE_TODOLIST', payload: { id: todolistId } } as const
}

export const addTodolistAC = (payload: { id: string, title: string }) => {
    return { type: 'ADD_TODOLIST', payload } as const
}

export const changeTodolistTitleAC = (payload: { id: string, title: string }) => {
    return { type: 'CHANGE_TODOLIST_TITLE', payload } as const
}

export const changeTodolistFilterAC = (id: string) => {
    return { type: 'CHANGE_TODOLIST_FILTER', payload: { id } } as const
}

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
