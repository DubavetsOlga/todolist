import { removeTaskTC, updateTaskTC } from "../../../../../model/tasks-reducer"
import { ChangeEvent } from "react"
import { Checkbox, ListItem } from "@mui/material"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { getListItemSx } from "./Task.styles"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { DomainTask } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "common/enums/enums"
import { TodolistType } from "../../../../../api/todolistsApi.types"

type Props = {
    task: DomainTask
    todolist: TodolistType
}

export const Task = ({ task, todolist }: Props) => {
    const dispatch = useAppDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskTC({ taskId: task.id, todolistId: todolist.id }))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        const newTask: DomainTask = {...task, status}
        dispatch(updateTaskTC({ task: newTask }))
    }

    const changeTaskTitleHandler = (title: string) => {
        const newTask: DomainTask = {...task, title}
        dispatch(updateTaskTC({ task: newTask }))
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
            <div>
                <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} />
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}
