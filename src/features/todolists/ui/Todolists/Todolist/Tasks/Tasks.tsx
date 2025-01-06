import List from "@mui/material/List"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { FilterValuesType } from "../Todolist"
import { Task } from "./Task/Task"
import { TaskStatus } from "common/enums/enums"
import { useGetTasksQuery } from "../../../../api/tasksApi"
import { DomainTodolist } from "../../../../api/todolistsApi.types"
import { TasksSkeleton } from "features/todolists/ui/skeletons/TasksSkeleton/TasksSkeleton"
import { setAppError } from "app/appSlice"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useEffect } from "react"

type Props = {
    todolist: DomainTodolist
    filter: FilterValuesType
}

export const Tasks = ({ todolist, filter }: Props) => {
    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const { data, isLoading, error } = useGetTasksQuery({ todolistId: todolist.id })

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

    if (isLoading) {
        return <TasksSkeleton />
    }

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

    let filteredTasks = taskFilter()

    return (
        <>
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List ref={listRef}>
                    {filteredTasks.map((task) => {
                        return <Task task={task} todolist={todolist} key={task.id} />
                    })}
                </List>
            )}
        </>
    )
}
