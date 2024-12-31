import { UnknownAction } from "redux"
import { appReducer, appSlice } from "./appSlice"
import { ThunkAction } from "redux-thunk"
import { authReducer, authSlice } from "../features/auth/model/authSlice"
import { configureStore } from "@reduxjs/toolkit"
import { tasksReducer, tasksSlice } from "../features/todolists/model/tasksSlice"
import { todolistsReducer, todolistsSlice } from "../features/todolists/model/todolistsSlice"

export const store = configureStore({
    reducer: {
        [tasksSlice.name]: tasksReducer,
        [todolistsSlice.name]: todolistsReducer,
        [appSlice.name]: appReducer,
        [authSlice.name]: authReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
