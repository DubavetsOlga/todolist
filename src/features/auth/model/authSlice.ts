import { LoginArgs } from "../api/authApi.types"
import { Dispatch } from "redux"
import { authApi } from "../api/authApi"
import { setAppStatus } from "app/appSlice"
import { ResultCode } from "common/enums/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { clearTodolists } from "../../todolists/model/todolistsSlice"
import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        isInitialized: false,
    },
    // reducers состоит из подредьюсеров, каждый из которых эквивалентен одному
    // оператору case в switch, как мы делали раньше (обычный redux)
    reducers: (create) => ({
        setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }),
        setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
            state.isInitialized = action.payload.isInitialized
        }),
    }),
    selectors: {
        selectIsLoggedIn: state => state.isLoggedIn,
        selectIsInitialized: state => state.isInitialized,
    },
})

// Action creator также достаем с помощью slice
export const { setIsLoggedIn, setIsInitialized } = authSlice.actions
// Создаем reducer при помощи slice
export const authReducer = authSlice.reducer
export const { selectIsLoggedIn, selectIsInitialized } = authSlice.selectors

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    authApi
        .login(data)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({ status: "succeeded" }))
                dispatch(setIsLoggedIn({ isLoggedIn: true }))
                localStorage.setItem("sn-token", res.data.data.token)
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    authApi
        .logout()
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({ status: "succeeded" }))
                dispatch(setIsLoggedIn({ isLoggedIn: false }))
                localStorage.removeItem("sn-token")
                dispatch(clearTodolists())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    authApi
        .me()
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({ status: "succeeded" }))
                dispatch(setIsLoggedIn({ isLoggedIn: true }))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitialized({ isInitialized: true }))
        })
}
