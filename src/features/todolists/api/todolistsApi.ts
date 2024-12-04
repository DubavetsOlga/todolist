import { TodolistType } from "./todolistsApi.types"
import { BaseResponse } from "common/types"
import { instance } from "common/instance/instance"

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists")
    },

    updateTodolist(payload: { id: string; title: string }) {
        const { title, id } = payload
        return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
    },

    createTodolist(title: string) {
        return instance.post<BaseResponse<{ item: TodolistType }>>("todo-lists", { title })
    },

    deleteTodolist(id: string) {
        return instance.delete<BaseResponse>(`todo-lists/${id}`)
    },
}
