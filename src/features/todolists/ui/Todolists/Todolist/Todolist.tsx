import { useState } from "react"
import { AddItemForm } from "common/components"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { useAddTaskMutation } from "../../../api/tasksApi"
import { DomainTodolist } from "../../../api/todolistsApi.types"

export type FilterValuesType = "all" | "active" | "completed"

type TodolistPropsType = {
    todolist: DomainTodolist
}

export const Todolist = ({ todolist }: TodolistPropsType) => {
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilterHandler = (newFilterValue: FilterValuesType) => {
        setFilter(newFilterValue)
    }

    const [addTask] = useAddTaskMutation()

    const addTaskCallback = (title: string) => {
        addTask({ title, todolistId: todolist.id })
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
