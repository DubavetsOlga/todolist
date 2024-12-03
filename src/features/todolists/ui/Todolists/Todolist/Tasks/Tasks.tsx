import List from "@mui/material/List"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { TodolistType } from "app/App"
import { FilterValuesType } from "../Todolist"
import { Task } from "./Task/Task"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectTasks } from "app/appSelectors"

type Props = {
    todolist: TodolistType
    filter: FilterValuesType
}

export const Tasks = ({ todolist, filter }: Props) => {
    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const tasks = useAppSelector(selectTasks)

    const allTodolistTasks = tasks[todolist.id]

    const taskFilter = () => {
        switch (filter) {
            case "active":
                return allTodolistTasks.filter((task) => !task.isDone)
            case "completed":
                return allTodolistTasks.filter((task) => task.isDone)
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
                        return <Task task={task} todolist={todolist} />
                    })}
                </List>
            )}
        </>
    )
}
