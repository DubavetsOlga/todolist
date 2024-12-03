import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../../../../../model/tasks-reducer"
import { ChangeEvent } from "react"
import { Checkbox, ListItem } from "@mui/material"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { TaskType, TodolistType } from "app/App"
import { getListItemSx } from "./Task.styles"
import { useAppDispatch } from "common/hooks/useAppDispatch"

type Props = {
    task: TaskType
    todolist: TodolistType
}

export const Task = ({ task, todolist }: Props) => {
    const dispatch = useAppDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskAC({ id: task.id, todolistId: todolist.id }))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const isDone = e.currentTarget.checked
        dispatch(changeTaskStatusAC({ id: task.id, taskStatus: isDone, todolistId: todolist.id }))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({ id: task.id, title, todolistId: todolist.id }))
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}
