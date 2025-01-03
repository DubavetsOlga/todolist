import { DomainTodolist } from "../../../../model/todolistsSlice"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import s from "./TodolistTitle.module.css"
import { useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from "../../../../api/todolistsApi"

type Props = {
    todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
    const { title, id, entityStatus } = todolist

    const [removeTodolist] = useRemoveTodolistMutation()
    const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

    const removeTodolistHandler = () => {
        removeTodolist(id)
    }
    const updateTodolistHandler = (title: string) => {
        updateTodolistTitle({ id, title })
    }

    return (
        <div className={s.container}>
            <h3>
                <EditableSpan value={title} onChange={updateTodolistHandler} disabled={entityStatus === "loading"} />
            </h3>
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}
