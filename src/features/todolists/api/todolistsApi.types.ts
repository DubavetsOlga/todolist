import { RequestStatus } from "app/appSlice"

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type DomainTodolist = TodolistType & {
    entityStatus: RequestStatus
}
