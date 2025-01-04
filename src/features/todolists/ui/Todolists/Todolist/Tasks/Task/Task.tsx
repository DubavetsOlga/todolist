import { ChangeEvent } from "react"
import { Checkbox, ListItem } from "@mui/material"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { getListItemSx } from "./Task.styles"
import { DomainTask } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "common/enums/enums"
import { useRemoveTaskMutation, useUpdateTaskMutation } from "../../../../../api/tasksApi"
import { DomainTodolist } from "../../../../../api/todolistsApi.types"

type Props = {
    task: DomainTask
    todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
    const [removeTask] = useRemoveTaskMutation()

    const removeTaskHandler = () => {
        removeTask({ taskId: task.id, todolistId: todolist.id })
    }

    const [updateTask] = useUpdateTaskMutation()

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        const newTask: DomainTask = { ...task, status }
        updateTask({ task: newTask })
    }

    const changeTaskTitleHandler = (title: string) => {
        const newTask: DomainTask = { ...task, title }
        updateTask({ task: newTask })
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
            <div>
                <Checkbox
                    checked={task.status === TaskStatus.Completed}
                    onChange={changeTaskStatusHandler}
                    disabled={todolist.entityStatus === "loading"}
                />
                <EditableSpan
                    value={task.title}
                    onChange={changeTaskTitleHandler}
                    disabled={todolist.entityStatus === "loading"}
                />
            </div>
            <IconButton onClick={removeTaskHandler} disabled={todolist.entityStatus === "loading"}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}
