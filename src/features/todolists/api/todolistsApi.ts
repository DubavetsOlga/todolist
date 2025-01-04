import { DomainTodolist, TodolistType } from "./todolistsApi.types"
import { BaseResponse } from "common/types"
import { baseApi } from "app/baseApi"

export const todolistsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTodolists: build.query<DomainTodolist[], void>({
            query: () => "todo-lists",
            transformResponse(todolists: TodolistType[]): DomainTodolist[] {
                return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
            },
            providesTags: ["Todolist"],
        }),
        addTodolist: build.mutation<BaseResponse<{ item: TodolistType }>, string>({
            query: (title) => {
                return {
                    url: "todo-lists",
                    method: "POST",
                    body: { title },
                }
            },
            invalidatesTags: ["Todolist"],
        }),
        removeTodolist: build.mutation<BaseResponse, string>({
            query: (id) => {
                return {
                    method: "DELETE",
                    url: `todo-lists/${id}`,
                }
            },
        }),
        updateTodolistTitle: build.mutation<BaseResponse, { id: string; title: string }>({
            query: ({ id, title }) => {
                return {
                    method: "PUT",
                    url: `todo-lists/${id}`,
                    body: {
                        title,
                    },
                }
            },
        }),
    }),
})

export const {
    useGetTodolistsQuery,
    useAddTodolistMutation,
    useRemoveTodolistMutation,
    useUpdateTodolistTitleMutation,
} = todolistsApi
