import { v1 } from 'uuid'
import { TasksStateType } from '../App'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './tasks-reducer'

test('correct task should be removed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TasksStateType = {
		[todolistId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistId2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	}

    const endState = tasksReducer(startState, removeTaskAC(startState[todolistId1][0].id, todolistId1))

    // expect(endState.length).toBe(1)
    // expect(endState[0].id).toBe(todolistId2)
})

test('correct task should be added', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TasksStateType = {
		[todolistId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistId2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	}

    const newTitle = 'New Task'

    const endState = tasksReducer(startState, addTaskAC(newTitle, v1(), todolistId1))

    // expect(endState.length).toBe(3)
    // expect(endState[2].title).toBe(newTitle)
})

test('correct task should change its name', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TasksStateType = {
		[todolistId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistId2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	}

    const endState = tasksReducer(startState, changeTaskTitleAC(startState[todolistId1][0].id, todolistId1, "New Title"))

    // expect(endState[0].title).toBe('What to learn')
    // expect(endState[1].title).toBe("New Title")
})

test('correct task should change its status', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TasksStateType = {
		[todolistId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistId2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	}

    const endState = tasksReducer(startState, changeTaskStatusAC(startState[todolistId1][0].id, todolistId1, false))

    // expect(endState[0].title).toBe('What to learn')
    // expect(endState[1].title).toBe("New Title")
})
