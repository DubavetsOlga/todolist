import {
    addTodolist,
    changeTodolistTitle,
    DomainTodolist,
    removeTodolist,
    todolistsReducer,
} from "../todolistsSlice"
import { v1 } from "uuid"

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {
            id: todolistId1,
            title: "What to learn",
            addedDate: "",
            order: 0,
            entityStatus: "idle"
        },
        {
            id: todolistId2,
            title: "What to buy",
            addedDate: "",
            order: 1,
            entityStatus: "idle"
        },
    ]
})

test("correct todolist should be removed", () => {
    const endState = todolistsReducer(startState, removeTodolist({ id: todolistId1 }))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
    const newTitle = "New Todolist"

    const endState = todolistsReducer(
        startState,
        addTodolist({
            todolist: {
                id: v1(),
                title: newTitle,
                addedDate: "",
                order: 3,
            },
        }),
    )

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
})

test("correct todolist should change its title", () => {
    const newTitle = "New Todolist"

    const endState = todolistsReducer(startState, changeTodolistTitle({ id: todolistId1, title: newTitle }))

    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe("What to buy")
})
