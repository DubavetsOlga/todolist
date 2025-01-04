import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { BaseResponse } from "common/types"

import { baseApi } from "app/baseApi"

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<GetTasksResponse, { todolistId: string }>({
            query: ({ todolistId }) => `todo-lists/${todolistId}/tasks`,
            providesTags: ["Task"],
        }),
        addTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
            query: ({ todolistId, title }) => {
                return {
                    url: `todo-lists/${todolistId}/tasks`,
                    method: "POST",
                    body: { title },
                }
            },
            invalidatesTags: ["Task"],
        }),
        removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
            query: ({ todolistId, taskId }) => {
                return {
                    method: "DELETE",
                    url: `todo-lists/${todolistId}/tasks/${taskId}`,
                }
            },
            invalidatesTags: ["Task"],
        }),
        updateTask: build.mutation<
            BaseResponse<{ item: DomainTask }>,
            { task: DomainTask }
        >({
            query: ({ task }) => {
                const model: UpdateTaskModel = {
                    status: task.status,
                    title: task.title,
                    deadline: task.deadline,
                    description: task.description,
                    priority: task.priority,
                    startDate: task.startDate,
                }
                return {
                    method: "PUT",
                    url: `todo-lists/${task.todoListId}/tasks/${task.id}`,
                    body: model,
                }
            },
            invalidatesTags: ["Task"],
        }),
    }),
})

export const { useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = tasksApi
