import { v1 } from "uuid"
import { TasksType } from "app/App"
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "../tasks-reducer"
import { addTodolistAC, removeTodolistAC } from "../todolists-reducer"

let startState: TasksType

beforeEach(() => {
    startState = {
        todolistId1: [
            { id: "task1", title: "HTML&CSS", isDone: true },
            { id: "task2", title: "JS", isDone: true },
            { id: "task3", title: "ReactJS", isDone: false },
        ],
        todolistId2: [
            { id: "task1", title: "Rest API", isDone: true },
            { id: "task2", title: "GraphQL", isDone: false },
        ],
    }
})

test("correct task should be removed", () => {
    const endState = tasksReducer(startState, removeTaskAC({ id: "task1", todolistId: "todolistId1" }))

    expect(endState).toEqual({
        todolistId1: [
            { id: "task2", title: "JS", isDone: true },
            { id: "task3", title: "ReactJS", isDone: false },
        ],
        todolistId2: [
            { id: "task1", title: "Rest API", isDone: true },
            { id: "task2", title: "GraphQL", isDone: false },
        ],
    })
})

test("correct task should be added to correct array", () => {
    const newTitle = "New Task"

    const endState = tasksReducer(startState, addTaskAC({ title: newTitle, id: v1(), todolistId: "todolistId1" }))

    expect(endState["todolistId1"].length).toBe(4)
    expect(endState["todolistId2"].length).toBe(2)
    expect(endState["todolistId1"][0].id).toBeDefined()
    expect(endState["todolistId1"][0].title).toBe(newTitle)
    expect(endState["todolistId1"][0].isDone).toBe(false)
})

test("title of specified task should be changed", () => {
    const newTitle = "New Task"
    const endState = tasksReducer(
        startState,
        changeTaskTitleAC({
            id: "task1",
            todolistId: "todolistId1",
            title: newTitle,
        }),
    )

    expect(endState["todolistId2"][0].title).toBe("Rest API")
    expect(endState["todolistId1"][0].title).toBe(newTitle)
})

test("status of specified task should be changed", () => {
    const endState = tasksReducer(
        startState,
        changeTaskStatusAC({
            id: "task1",
            taskStatus: false,
            todolistId: "todolistId1",
        }),
    )

    expect(endState["todolistId2"][0].isDone).toBe(true)
    expect(endState["todolistId1"][0].isDone).toBe(false)
})

test("new array should be added when new todolist is added", () => {
    const endState = tasksReducer(startState, addTodolistAC({ id: v1(), title: "new todolist" }))

    const keys = Object.keys(endState)
    const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
    const action = removeTodolistAC("todolistId2")

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).not.toBeDefined()
    // or
    expect(endState["todolistId2"]).toBeUndefined()
})
