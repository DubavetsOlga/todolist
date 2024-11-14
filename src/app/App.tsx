import { useState } from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { MenuButton } from './MenuButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './model/tasks-reducer';
import { addTodolistAC, changeTodolistTitleAC, removeTodolistAC } from './model/todolists-reducer';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store";

type ThemeMode = 'dark' | 'light'

export type TodolistType = {
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
	const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
	const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

	const dispatch = useDispatch()

	//tasks

	const removeTask = (taskId: string, todolistId: string) => {
		dispatch(removeTaskAC({ id: taskId, todolistId }))
	}

	const addTask = (title: string, todolistId: string) => {
		dispatch(addTaskAC({ title, id: v1(), todolistId }))
	}

	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		dispatch(changeTaskStatusAC({ id: taskId, todolistId, taskStatus }))
	}

	const updateTask = (todolistId: string, taskId: string, title: string) => {
		dispatch(changeTaskTitleAC( { id: taskId, todolistId, title }))
	}

	//todolists

	const removeTodolist = (todolistId: string) => {
		dispatch(removeTodolistAC(todolistId))
	}

	const addTodolist = (title: string) => {
		dispatch(addTodolistAC({ id: v1(), title }))
	}

	const updateTodolist = (todolistId: string, title: string) => {
		dispatch(changeTodolistTitleAC({ id: todolistId, title }))
	}

	//other

	const [themeMode, setThemeMode] = useState<ThemeMode>('light')

	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#087EA4',
			},
		},
	})

	const changeModeHandler = () => {
		setThemeMode(themeMode == 'light' ? 'dark' : 'light')
	}

	return (
		<div>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar position="static" sx={{ mb: '30px' }}>
					<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<IconButton color="inherit">
							<MenuIcon />
						</IconButton>
						<div>
							<MenuButton>Login</MenuButton>
							<MenuButton>Logout</MenuButton>
							<MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
							<Switch color={'default'} onChange={changeModeHandler} />
						</div>
					</Toolbar>
				</AppBar>
				<Container fixed>
					<Grid container sx={{ mb: '30px' }}>
						<AddItemForm addItem={addTodolist} />
					</Grid>
					<Grid container spacing={4}>
						{todolists.map(tl => {
							return (
								<Grid>
									<Paper sx={{ p: '0 20px 20px 20px' }}>
										<Todolist
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
									</Paper>
								</Grid>
							)})}
					</Grid>
				</Container>
			</ThemeProvider>
		</div>
	);
}

export default App;