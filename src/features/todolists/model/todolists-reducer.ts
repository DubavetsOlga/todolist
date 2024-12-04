import { TodolistType } from "../api/todolistsApi.types"
import { Dispatch } from "redux"
import { todolistsApi } from "../api/todolistsApi"

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({ ...tl, filter: 'all' }))
        }
        case "REMOVE_TODOLIST": {
            return state.filter((tl) => tl.id !== action.payload.id)
        }
        case "ADD_TODOLIST": {
            return [{
                id: action.payload.id,
                title: action.payload.title,
                addedDate: '',
                order: 0,
            }, ...state]
        }
        case "CHANGE_TODOLIST_TITLE": {
            return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
        }
        default:
            return state
    }
}

// Action creators
export const removeTodolistAC = (todolistId: string) => {
    return { type: "REMOVE_TODOLIST", payload: { id: todolistId } } as const
}

export const addTodolistAC = (payload: { id: string; title: string }) => {
    return { type: "ADD_TODOLIST", payload } as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
    return { type: "CHANGE_TODOLIST_TITLE", payload } as const
}

export const changeTodolistFilterAC = (id: string) => {
    return { type: "CHANGE_TODOLIST_FILTER", payload: { id } } as const
}

export const setTodolistsAC = (todolists: TodolistType[]) => {
    return { type: 'SET-TODOLISTS', todolists } as const
}

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

//Thunks
export const fetchTodolistsThunk = (dispatch: Dispatch) => {
    todolistsApi.getTodolists().then(res => {
        dispatch(setTodolistsAC(res.data))
    })
}
