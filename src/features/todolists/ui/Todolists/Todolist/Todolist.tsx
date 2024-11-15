import { useState } from 'react';
import { TodolistType } from "./app/App";
import { AddItemForm } from './AddItemForm';
import { FilterTasksButtons } from "./features/todolists/ui/Todolists/FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "./features/todolists/ui/Todolists/Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle";
import { addTaskAC } from "./model/tasks-reducer";
import { v1 } from "uuid";
import { useDispatch } from "react-redux";

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistPropsType = {
	todolist: TodolistType
}

export const Todolist = ({ todolist }: TodolistPropsType) => {
	const dispatch = useDispatch()

	const [filter, setFilter] = useState<FilterValuesType>('all');

	const changeFilterHandler = (newFilterValue: FilterValuesType) => {
		setFilter(newFilterValue);
	}

	const addTask = (title: string) => {
		dispatch(addTaskAC({ title, id: v1(), todolistId: todolist.id }))
	}

	return (
		<div className="todolist">
			<TodolistTitle todolist={todolist}/>
			<AddItemForm addItem={addTask} />
			<Tasks filter={filter} todolist={todolist}/>
			<FilterTasksButtons filter={filter} changeFilter={changeFilterHandler}/>
		</div>
	)
}
