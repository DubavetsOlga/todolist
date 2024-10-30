import { ChangeEvent, useState, KeyboardEvent } from 'react';
import {TaskType} from "./App";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box'
import { filterButtonsContainerSx, getListItemSx } from './Todolist.styles'

export type FilterValuesType = 'all' | 'active' | 'completed'

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

	const changeFilterHandler = (newFilterValue: FilterValuesType) => {
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
				<IconButton onClick={removeTodolistHandler}>
					<DeleteIcon />
				</IconButton>
			</div>
			<AddItemForm addItem={addTaskCallback} />
			{
				filteredTasks.length === 0
					? <p>No tasks</p>
					: <List ref={listRef}>
						{filteredTasks.map((task) => {
							const changeTaskTitleHandler = (title: string) => {
								updateTask(todolistId, task.id, title)
							}
							return (
							<ListItem key={task.id} sx={getListItemSx(task.isDone)} className={task.isDone ? 'is-done' : ''}
							>
								<div>
									<Checkbox checked={task.isDone} onChange={e => changeTaskStatusHandler(task.id, e)} />
									<EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
								</div>
								<IconButton onClick={() => removeTaskHandler(task.id)}>
									<DeleteIcon />
								</IconButton>
							</ListItem>
						)})}
					</List>
			}
			<Box sx={filterButtonsContainerSx}>
				<Button
					variant={filter === 'all' ? 'outlined' : 'text'}
					color={'inherit'}
					onClick={() => changeFilterHandler('all')}
				>
					All
				</Button>
				<Button
					variant={filter === 'active' ? 'outlined' : 'text'}
					color={'primary'}
					onClick={() => changeFilterHandler('active')}
				>
					Active
				</Button>
				<Button
					variant={filter === 'completed' ? 'outlined' : 'text'}
					color={'secondary'}
					onClick={() => changeFilterHandler('completed')}
				>
					Completed
				</Button>
			</Box>
		</div>
	)
}
