import List from "@mui/material/List"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { FilterValuesType } from "../Todolist"
import { Task } from "./Task/Task"
import { TaskStatus } from "common/enums/enums"
import { useGetTasksQuery } from "../../../../api/tasksApi"
import { DomainTodolist } from "../../../../api/todolistsApi.types"

type Props = {
    todolist: DomainTodolist
    filter: FilterValuesType
}

export const Tasks = ({ todolist, filter }: Props) => {
    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const { data } = useGetTasksQuery({ todolistId: todolist.id })

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
