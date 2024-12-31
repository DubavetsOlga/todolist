import { useState } from "react"
import { AddItemForm } from "common/components"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { addTaskTC } from "../../../model/tasksSlice"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { DomainTodolist } from "../../../model/todolistsSlice"

export type FilterValuesType = "all" | "active" | "completed"

type TodolistPropsType = {
    todolist: DomainTodolist
}

export const Todolist = ({ todolist }: TodolistPropsType) => {
    const dispatch = useAppDispatch()

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilterHandler = (newFilterValue: FilterValuesType) => {
        setFilter(newFilterValue)
    }

    const addTaskCallback = (title: string) => {
        dispatch(addTaskTC({ title, todolistId: todolist.id }))
    }

    return (
        <div className="todolist">
            <TodolistTitle todolist={todolist} />
            <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
            <Tasks filter={filter} todolist={todolist}/>
            <FilterTasksButtons filter={filter} changeFilter={changeFilterHandler} />
        </div>
    )
}
