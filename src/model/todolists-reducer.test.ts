import { addTodolistAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './todolists-reducer'
import { v1 } from 'uuid'
import { TodolistType } from '../App'

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn'},
        { id: todolistId2, title: 'What to buy' },
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn'},
        { id: todolistId2, title: 'What to buy' },
    ]

    const newTitle = 'New Todolist'

    const endState = todolistsReducer(startState, addTodolistAC(v1(), newTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
})

test('correct todolist should change its title', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn' },
        { id: todolistId2, title: 'What to buy' },
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId1, "New Title"))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe("New Title")
})

