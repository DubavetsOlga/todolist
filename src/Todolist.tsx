import { ChangeEvent, useState, KeyboardEvent } from 'react';
import {TaskType} from "./App";
import {Button} from "./Button";
import {useAutoAnimate} from "@formkit/auto-animate/react";

type FilterValuesType = 'all' | 'active' | 'completed'

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string) => void
	addTask: (taskTitle: string) => void
	changeTaskStatus: (taskId: string, newStatusValue: boolean) => void
}

export const Todolist = ({title, tasks, removeTask, addTask, changeTaskStatus}: PropsType) => {

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

	const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value);
	}

	const addTaskHandler = () => {
		if (!taskTitle.trim()) {
			setError('Title is required');
			setTaskTitle('');
			return;
		}

		if (isTaskTitleValid) {
			addTask(taskTitle.trim());
			setTaskTitle('');
		}
	}

	const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null);
		if (event.key === 'Enter') {
			addTaskHandler();
		}
	}

	const removeTaskHandler = (taskId: string) => {
		removeTask(taskId);
	}

	const changeTaskStatusHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
		changeTaskStatus(taskId, e.currentTarget.checked)
	}

	const isTaskTitleValid = taskTitle.length < 16;

	return (
		<div className="todolist">
			<h3>{title}</h3>
			<div>
				<input
					value={taskTitle}
					className={error ? 'error' : ''}
					onChange={changeTaskTitleHandler}
					onKeyUp={addTaskOnKeyUpHandler}
					placeholder='max length 15'
					maxLength={15}
				/>
				<Button title={'+'} onClick={addTaskHandler} isDisabled={!isTaskTitleValid}/>
				{!isTaskTitleValid && <div className={'error-message'}>Max length is 15</div>}
				{error && <div className={'error-message'}>{error}</div>}
			</div>
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
