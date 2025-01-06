import { TaskStatus } from "common/enums/enums"
import { DomainTodolist } from "../../features/todolists/api/todolistsApi.types"
import { useEffect, useState } from "react"
import { useGetTasksQuery } from "../../features/todolists/api/tasksApi"
import { FilterValuesType } from "../../features/todolists/ui/Todolists/Todolist/Todolist"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { setAppError } from "app/appSlice"

export const useTasks = (todolist: DomainTodolist, filter: FilterValuesType) => {
    const [page, setPage] = useState(1)

    const { data, isLoading, error } = useGetTasksQuery({ todolistId: todolist.id, args: { page } })

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (error) {
            let errMsg = "Some error occurred"
            if ("data" in error) {
                const errData = error.data as Error
                if ("message" in errData) {
                    errMsg = errData.message as string
                }
            }
            dispatch(setAppError({ error: errMsg }))
        }
    }, [error])

    const allTodolistTasks = data ? data.items : []

    const taskFilter = () => {
        switch (filter) {
            case "active":
                return allTodolistTasks.filter((task) => task.status === TaskStatus.New)
            case "completed":
                return allTodolistTasks.filter((task) => task.status === TaskStatus.Completed)
            default:
                return allTodolistTasks
        }
    }

    return { tasks: taskFilter(), isLoading, page, setPage, totalCount: data?.totalCount }
}
