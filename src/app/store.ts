import { combineReducers, UnknownAction } from "redux"
import { tasksReducer } from "../features/todolists/model/tasks-reducer"
import { todolistsReducer } from "../features/todolists/model/todolists-reducer"
import { appReducer } from "./appSlice"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { authReducer } from "../features/auth/model/authSlice"
import { configureStore } from "@reduxjs/toolkit"

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})
// непосредственно создаём store
//export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))
export const store = configureStore({ reducer: rootReducer })

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

//type AppActions = TodolistActionTypes | TaskActionTypes | AuthActionTypes | AppActionsTypes

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
