import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types"

export const tasksApi = {
    getTasks(id: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${id}/tasks`)
    },

    updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
        const { todolistId, taskId, model } = payload
        return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },

    createTask(payload: { todolistId: string; title: string }) {
        const { todolistId, title } = payload
        return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
    },

    deleteTask(payload: { todolistId: string; taskId: string }) {
        const { todolistId, taskId } = payload
        return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
}
