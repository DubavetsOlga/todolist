import { TodolistType } from "../api/todolistsApi.types"
import { Dispatch } from "redux"
import { todolistsApi } from "../api/todolistsApi"
import { RequestStatus, setAppStatusAC } from "app/app-reducer"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { ResultCode } from "common/enums/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { AppThunk } from "app/store"

export type DomainTodolist = TodolistType & {
    entityStatus: RequestStatus
}

const initialState: DomainTodolist[] = []

export const todolistsReducer = (
    state: DomainTodolist[] = initialState,
    action: TodolistActionTypes,
): DomainTodolist[] => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.todolists.map((tl) => ({ ...tl, entityStatus: "idle" }))
        }
        case "REMOVE_TODOLIST": {
            return state.filter((tl) => tl.id !== action.payload.id)
        }
        case "ADD_TODOLIST": {
            return [{ ...action.payload.todolist, entityStatus: "idle" }, ...state]
        }
        case "CHANGE_TODOLIST_TITLE": {
            return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return state.map((tl) =>
                tl.id === action.payload.id
                    ? {
                          ...tl,
                          entityStatus: action.payload.entityStatus,
                      }
                    : tl,
            )
        }
        case "CLEAR_STATE": {
            return []
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

export const changeTodolistEntityStatusAC = (payload: { id: string; entityStatus: RequestStatus }) => {
    return { type: "CHANGE-TODOLIST-ENTITY-STATUS", payload } as const
}

export const clearStateAC = () => {
    return { type: "CLEAR_STATE" } as const
}

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>
export type ClearStateActionType = ReturnType<typeof clearStateAC>

export type TodolistActionTypes =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | SetTodolistsActionType
    | ChangeTodolistEntityStatusActionType
    | ClearStateActionType

//Thunks
export const fetchTodolistsTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    // todolistsApi
    //     .getTodolists()
    //     .then((res) => {
    //         dispatch(setAppStatusAC("succeeded"))
    //         dispatch(setTodolistsAC(res.data))
    //     })
    //     .catch((error) => {
    //         handleServerNetworkError(error, dispatch)
    //     })

    try {
        const res = await todolistsApi.getTodolists()
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setTodolistsAC(res.data))
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
    }
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi
        .createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC("succeeded"))
                dispatch(addTodolistAC({ todolist: res.data.data.item }))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "loading" }))
    todolistsApi
        .deleteTodolist(id)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC("succeeded"))
                dispatch(removeTodolistAC({ id }))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi
        .updateTodolist(arg)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC("succeeded"))
                dispatch(changeTodolistTitleAC(arg))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
