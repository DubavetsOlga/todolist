import { TodolistType } from "../api/todolistsApi.types"
import { RequestStatus } from "app/appSlice"
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
            return action.payload.todolists.map((tl) => ({ ...tl, entityStatus: "idle" }))
        }),
        clearTodolists: create.reducer(() => {
            return []
        }),
    }),
    selectors: {
        selectTodolists: (state) => state,
    },
})

export const { removeTodolist, addTodolist, changeTodolistTitle, clearTodolists } = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer
