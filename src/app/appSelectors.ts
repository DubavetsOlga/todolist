import { RootState } from "./store"

export const selectThemeMode = (state: RootState) => state.app.themeMode

export const selectTodolists = (state: RootState) => state.todolists

export const selectTasks = (state: RootState) => state.tasks

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn

export const selectIsInitialized = (state: RootState) => state.auth.isInitialized
