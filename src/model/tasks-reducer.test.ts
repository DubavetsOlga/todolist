import { v1 } from 'uuid'
import { TasksStateType } from '../App'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './tasks-reducer'
import { addTodolistAC, removeTodolistAC } from './todolists-reducer'

let todolistId1: string
let todolistId2: string
let startState: TasksStateType

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = {
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
})

test('correct task should be removed', () => {
    const endState = tasksReducer(startState, removeTaskAC({ id: startState[todolistId1][0].id, todolistId: todolistId1 }))

    // expect(endState.length).toBe(1)
    // expect(endState[0].id).toBe(todolistId2)
})

test('correct task should be added to correct array', () => {
    const newTitle = 'New Task'

	const endState = tasksReducer(startState, addTaskAC({ title: newTitle, id: v1(), todolistId: todolistId1 }))

	// expect(endState['todolistId1'].length).toBe(XXX)
	// expect(endState['todolistId2'].length).toBe(XXX)
	// expect(endState['todolistId2'][0].id).toBeDefined()
	// expect(endState['todolistId2'][0].title).toBe(XXX)
	// expect(endState['todolistId2'][0].isDone).toBe(XXX)
})

test('title of specified task should be changed', () => {
	const newTitle = 'New Task'
    const endState = tasksReducer(startState, changeTaskTitleAC({
		id: startState[todolistId1][0].id,
		todolistId: todolistId1,
		title: newTitle
	}))

    // expect(endState[0].title).toBe('What to learn')
    // expect(endState[1].title).toBe("New Title")
})

test('status of specified task should be changed', () => {
    const endState = tasksReducer(
		startState,
		changeTaskStatusAC({
			id: startState[todolistId1][0].id,
			taskStatus: false,
			todolistId: todolistId1,
		})
	)

    // expect(endState[0].title).toBe('What to learn')
    // expect(endState[1].title).toBe("New Title")
})

test('new array should be added when new todolist is added', () => {
	const endState = tasksReducer(startState, addTodolistAC({id: v1(), title: 'new todolist' }))

	const keys = Object.keys(endState)
	const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
	if (!newKey) {
		throw Error('new key should be added')
	}

	expect(keys.length).toBe(3)
	expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
	const action = removeTodolistAC('todolistId2')

	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)

	expect(keys.length).toBe(1)
	expect(endState['todolistId2']).not.toBeDefined()
	// or
	expect(endState['todolistId2']).toBeUndefined()
})
