import { useState } from 'react';
import { TodolistType } from "../../../../../app/App";
import { AddItemForm } from '../../../../../common/components/AddItemForm/AddItemForm';
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { addTaskAC } from "../../../model/tasks-reducer";
import { v1 } from "uuid";
import { useAppDispatch } from "../../../../../common/hooks/useAppDispatch";

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistPropsType = {
	todolist: TodolistType
}

export const Todolist = ({ todolist }: TodolistPropsType) => {
	const dispatch = useAppDispatch()

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
