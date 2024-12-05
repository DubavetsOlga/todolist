import { useState } from "react"
import { AddItemForm } from "common/components"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { addTaskAC, addTaskTC } from "../../../model/tasks-reducer"
import { v1 } from "uuid"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { TodolistType } from "../../../api/todolistsApi.types"

export type FilterValuesType = "all" | "active" | "completed"

type TodolistPropsType = {
    todolist: TodolistType
}

export const Todolist = ({ todolist }: TodolistPropsType) => {
    const dispatch = useAppDispatch()

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilterHandler = (newFilterValue: FilterValuesType) => {
        setFilter(newFilterValue)
    }

    const addTask = (title: string) => {
        dispatch(addTaskTC({ title, todolistId: todolist.id }))
    }

    return (
        <div className="todolist">
            <TodolistTitle todolist={todolist} />
            <AddItemForm addItem={addTask} />
            <Tasks filter={filter} todolist={todolist} />
            <FilterTasksButtons filter={filter} changeFilter={changeFilterHandler} />
        </div>
    )
}
