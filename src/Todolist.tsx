import { ChangeEvent, useState, KeyboardEvent } from 'react';
import {TaskType} from "./App";
import {Button} from "./Button";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

type FilterValuesType = 'all' | 'active' | 'completed'

type PropsType = {
	todolistId: string
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	addTask: (taskTitle: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, newStatusValue: boolean, todolistId: string) => void
	removeTodolist: (todolistId: string) => void
	updateTask: (todolistId: string, taskId: string, title: string) => void
	updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = (props: PropsType) => {

	const {
		title, tasks, removeTask, addTask, changeTaskStatus, todolistId, removeTodolist, updateTask, updateTodolist
	} = props

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

	const updateTodolistHandler = (title: string) => {
		updateTodolist(props.todolistId, title)
	}

	return (
		<div className="todolist">
			<div className={'todolist-title-container'}>
				<EditableSpan value={title} onChange={updateTodolistHandler} />
				<Button title={'x'} onClick={removeTodolistHandler} />
			</div>
			<AddItemForm addItem={addTaskCallback} />
			{
				filteredTasks.length === 0
					? <p>No tasks</p>
					: <ul ref={listRef}>
						{filteredTasks.map((task) => {
							const changeTaskTitleHandler = (title: string) => {
								updateTask(todolistId, task.id, title)
							}
							return (
							<li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<input type="checkbox" checked={task.isDone} onChange={e => changeTaskStatusHandler(task.id, e)}/>
								<EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
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
