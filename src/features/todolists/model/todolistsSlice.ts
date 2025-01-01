import { TodolistType } from "../api/todolistsApi.types"
import { Dispatch } from "redux"
import { todolistsApi } from "../api/todolistsApi"
import { RequestStatus, setAppStatus } from "app/appSlice"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { ResultCode } from "common/enums/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { AppThunk } from "app/store"
import { createSlice } from "@reduxjs/toolkit"

export type DomainTodolist = TodolistType & {
    entityStatus: RequestStatus
}

export const todolistsSlice = createSlice({
    name: "todolists",
    initialState: [] as DomainTodolist[],
    reducers: (create) => ({
        removeTodolist: create.reducer<{ id: string }>((state, action) => {
            const index = state.findIndex((tl) => tl.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        }),
        addTodolist: create.reducer<{ todolist: TodolistType }>((state, action) => {
            state.unshift({ ...action.payload.todolist, entityStatus: "idle" })
        }),
        changeTodolistTitle: create.reducer<{ id: string; title: string }>((state, action) => {
            const index = state.findIndex((tl) => tl.id === action.payload.id)
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        }),
        changeTodolistEntityStatus: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
            const todolist = state.find((tl) => tl.id === action.payload.id)
            if (todolist) {
                todolist.entityStatus = action.payload.entityStatus
            }
        }),
        setTodolists: create.reducer<{ todolists: TodolistType[] }>((state, action) => {
            // 1 variant
            return action.payload.todolists.map(tl => ({ ...tl, entityStatus: 'idle' }))

            // 2 variant
            //action.payload.todolists.forEach((tl) => {
            //    state.push({ ...tl, entityStatus: "idle" })
            //})
        }),
        clearTodolists: create.reducer(() => {
            return []
        }),
    }),
    selectors: {
        selectTodolists: (state) => state,
    },
})

export const {
    removeTodolist,
    addTodolist,
    changeTodolistEntityStatus,
    changeTodolistTitle,
    clearTodolists,
    setTodolists,
} = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer
export const { selectTodolists } = todolistsSlice.selectors

//Thunks
export const fetchTodolistsTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
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
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(setTodolists({ todolists: res.data }))
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
    }
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    todolistsApi
        .createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({ status: "succeeded" }))
                dispatch(addTodolist({ todolist: res.data.data.item }))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    dispatch(changeTodolistEntityStatus({ id, entityStatus: "loading" }))
    todolistsApi
        .deleteTodolist(id)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({ status: "succeeded" }))
                dispatch(removeTodolist({ id }))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    todolistsApi
        .updateTodolist(arg)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({ status: "succeeded" }))
                dispatch(changeTodolistTitle(arg))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
