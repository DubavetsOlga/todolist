import { RootState } from "./store"

export const selectTodolists = (state: RootState) => state.todolists

export const selectTasks = (state: RootState) => state.tasks
