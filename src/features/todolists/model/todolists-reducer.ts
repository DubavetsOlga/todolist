import { TodolistType } from "../api/todolistsApi.types"
import { Dispatch } from "redux"
import { todolistsApi } from "../api/todolistsApi"

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.todolists.map((tl) => ({ ...tl, filter: "all" }))
        }
        case "REMOVE_TODOLIST": {
            return state.filter((tl) => tl.id !== action.payload.id)
        }
        case "ADD_TODOLIST": {
            return [action.payload.todolist, ...state]
        }
        case "CHANGE_TODOLIST_TITLE": {
            return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
        }
        default:
            return state
    }
}

// Action creators
export const removeTodolistAC = (payload: { id: string }) => {
    return { type: "REMOVE_TODOLIST", payload } as const
}

export const addTodolistAC = (payload: { todolist: TodolistType }) => {
    return { type: "ADD_TODOLIST", payload } as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
    return { type: "CHANGE_TODOLIST_TITLE", payload } as const
}

export const setTodolistsAC = (todolists: TodolistType[]) => {
    return { type: "SET-TODOLISTS", todolists } as const
}

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | SetTodolistsActionType

//Thunks
export const fetchTodolistsThunk = (dispatch: Dispatch) => {
    todolistsApi.getTodolists().then((res) => {
        dispatch(setTodolistsAC(res.data))
    })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsApi.createTodolist(title).then((res) => {
        dispatch(addTodolistAC({ todolist: res.data.data.item }))
    })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
    todolistsApi.deleteTodolist(id).then((res) => {
        dispatch(removeTodolistAC({ id }))
    })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
    todolistsApi.updateTodolist(arg).then((res) => {
        dispatch(changeTodolistTitleAC(arg))
    })
}
