import List from "@mui/material/List"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { FilterValuesType } from "../Todolist"
import { Task } from "./Task/Task"
import { useAppSelector } from "common/hooks/useAppSelector"
import { TaskStatus } from "common/enums/enums"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useEffect } from "react"
import { fetchTasksTC, selectTasks } from "../../../../model/tasksSlice"
import { DomainTodolist } from "../../../../model/todolistsSlice"

type Props = {
    todolist: DomainTodolist
    filter: FilterValuesType
}

export const Tasks = ({ todolist, filter }: Props) => {
    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(todolist.id))
    }, [])

    const allTodolistTasks = tasks[todolist.id] ?? []

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
