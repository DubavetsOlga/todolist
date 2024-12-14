import { AnyAction, applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux"
import { TaskActionTypes, tasksReducer } from "../features/todolists/model/tasks-reducer"
import { TodolistActionTypes, todolistsReducer } from "../features/todolists/model/todolists-reducer"
import { AppActionsTypes, appReducer } from "./app-reducer"
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk"
import { AuthActionTypes, authReducer } from "../features/auth/model/auth-reducer"

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

type AppActions = TodolistActionTypes | TaskActionTypes | AuthActionTypes | AppActionsTypes

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
