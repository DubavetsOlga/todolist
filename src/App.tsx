import { useState } from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

type TodolistType = {
	id: string
	title: string
}

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type TasksStateType = {
	[key: string]: TaskType[]
}

const todolistID1 = v1()
const todolistID2 = v1()

function App() {
	const [todolists, setTodolists] = useState<TodolistType[]>([
		{ id: todolistID1, title: 'What to learn'},
		{ id: todolistID2, title: 'What to buy'},
	])

	const [tasks, setTasks] = useState<TasksStateType>({
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	})

	const removeTask = (taskId: string, todolistId: string) => {
		setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) });
	}

	const addTask = (title: string, todolistId: string) => {
		const newTask = {
			id: v1(),
			title: title,
			isDone: false,
		}
		setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
	}

	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		setTasks({
			...tasks,
			[todolistId]: tasks[todolistId].map(t => (t.id == taskId ? { ...t, isDone: taskStatus } : t)),
		});
	}

	const removeTodolist = (todolistId: string) => {
		setTodolists(todolists.filter(tl => tl.id !== todolistId));

		delete tasks[todolistId];
		setTasks({ ...tasks });
	}

	const addTodolist = (title: string) => {
		const todolistId = v1();
		setTodolists([{ id: todolistId, title: title }, ...todolists]);
		setTasks({ ...tasks, [todolistId]: [] });
	}

	const updateTask = (todolistId: string, taskId: string, title: string) => {
		setTasks({
			...tasks,
			[todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, title } : t)),
		});
	}

	const updateTodolist = (todolistId: string, title: string) => {
		setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, title } : tl)));
	}

	return (
		<div className="App">
			<AddItemForm addItem={addTodolist} />
			{todolists.map(tl => {
				return (<Todolist
					key={tl.id}
					todolistId={tl.id}
					title={tl.title}
					tasks={tasks[tl.id]}
					removeTask={removeTask}
					addTask={addTask}
					changeTaskStatus={changeTaskStatus}
					removeTodolist={removeTodolist}
					updateTask={updateTask}
					updateTodolist={updateTodolist}
				/>
			)})
			}
		</div>
	);
}

export default App;
