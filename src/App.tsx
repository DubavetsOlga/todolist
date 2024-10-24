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

let todolistID1 = v1()
let todolistID2 = v1()

function App() {
	let [todolists, setTodolists] = useState<TodolistType[]>([
		{ id: todolistID1, title: 'What to learn'},
		{ id: todolistID2, title: 'What to buy'},
	])

	let [tasks, setTasks] = useState<TasksStateType>({
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
		const newTodolists = todolists.filter(tl => tl.id !== todolistId);
		setTodolists(newTodolists);

		delete tasks[todolistId];
		setTasks({ ...tasks });
	}

	const addTodolist = (title: string) => {
		const todolistId = v1();
		setTodolists([{ id: todolistId, title: title }, ...todolists]);
		setTasks({ ...tasks, [todolistId]: [] });
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
				/>
			)})
			}
		</div>
	);
}

export default App;
