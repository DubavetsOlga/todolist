import { addTodolistAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from "../todolists-reducer"
import { v1 } from "uuid"
import { TodolistType } from "app/App"

let todolistId1: string
let todolistId2: string
let startState: TodolistType[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        { id: todolistId1, title: "What to learn" },
        { id: todolistId2, title: "What to buy" },
    ]
})

test("correct todolist should be removed", () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
    const newTitle = "New Todolist"

    const endState = todolistsReducer(startState, addTodolistAC({ id: v1(), title: newTitle }))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
})

test("correct todolist should change its title", () => {
    const newTitle = "New Todolist"

    const endState = todolistsReducer(startState, changeTodolistTitleAC({ id: todolistId1, title: newTitle }))

    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe("What to buy")
})
