import { ChangeEvent, useState, KeyboardEvent } from 'react';
import {TaskType} from "./App";
import {Button} from "./Button";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import { AddItemForm } from './AddItemForm';

type FilterValuesType = 'all' | 'active' | 'completed'

type PropsType = {
	todolistId: string
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	addTask: (taskTitle: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, newStatusValue: boolean, todolistId: string) => void
	removeTodolist: (todolistId: string) => void
}

export const Todolist = ({title, tasks, removeTask, addTask, changeTaskStatus, todolistId, removeTodolist}: PropsType) => {

	const [filter, setFilter] = useState('all');
	const [taskTitle, setTaskTitle] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [listRef] = useAutoAnimate<HTMLUListElement>();

	const taskFilter = () => {
		switch (filter) {
			case 'active':
				return tasks.filter(task => !task.isDone);
			case 'completed':
				return tasks.filter(task => task.isDone)
			default: return tasks;
		}
	}

	let filteredTasks = taskFilter();

	const changeFilter = (newFilterValue: FilterValuesType) => {
		setFilter(newFilterValue);
	}

	const addTaskHandler = () => {
		addTask(taskTitle.trim(), todolistId);
	}

	const removeTaskHandler = (taskId: string) => {
		removeTask(taskId, todolistId);
	}

	const changeTaskStatusHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
		changeTaskStatus(taskId, e.currentTarget.checked, todolistId)
	}

	const removeTodolistHandler = () => {
		removeTodolist(todolistId);
	}

	const addTaskCallback = (title: string) => {
		addTask(title, todolistId)
	}

	return (
		<div className="todolist">
			<div className={'todolist-title-container'}>
				<h3>{title}</h3>
				<Button title={'x'} onClick={removeTodolistHandler} />
			</div>
			<AddItemForm addItem={addTaskCallback} />
			{
				filteredTasks.length === 0
					? <p>No tasks</p>
					: <ul ref={listRef}>
						{filteredTasks.map((task) => {
							return (
							<li key={task.id}>
								<input type="checkbox" checked={task.isDone} onChange={e => changeTaskStatusHandler(task.id, e)}/>
								<span className={task.isDone ? 'is-done' : ''}>{task.title}</span>
								<Button title={'x'} onClick={() => removeTaskHandler(task.id)} />
							</li>
						)})}
					</ul>
			}
			<div>
				<Button
					className={filter === 'all' ? 'active-filter' : ''}
					title={'All'}
					onClick={() => { changeFilter("all") }}
				/>
				<Button
					className={filter === 'active' ? 'active-filter' : ''}
					title={'Active'}
					onClick={() => { changeFilter("active") }}
				/>
				<Button
					className={filter === 'completed' ? 'active-filter' : ''}
					title={'Completed'}
					onClick={() => { changeFilter("completed") }}
				/>
			</div>
		</div>
	)
}
