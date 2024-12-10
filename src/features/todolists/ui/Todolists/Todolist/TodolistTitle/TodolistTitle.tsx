import { DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from "../../../../model/todolists-reducer"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import s from "./TodolistTitle.module.css"
import { useAppDispatch } from "common/hooks/useAppDispatch"

type Props = {
    todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
    const { title, id, entityStatus } = todolist

    const dispatch = useAppDispatch()

    const removeTodolistHandler = () => {
        dispatch(removeTodolistTC(id))
    }
    const updateTodolistHandler = (title: string) => {
        dispatch(updateTodolistTitleTC({ id, title }))
    }

    return (
        <div className={s.container}>
            <h3>
                <EditableSpan value={title} onChange={updateTodolistHandler} disabled={entityStatus === "loading"}/>
            </h3>
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}
