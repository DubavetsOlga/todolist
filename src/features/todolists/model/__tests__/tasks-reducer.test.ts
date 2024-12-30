import { v1 } from "uuid"
import { addTaskAC, removeTaskAC, tasksReducer, TasksType, updateTaskAC } from "../tasks-reducer"
import { addTodolistAC, removeTodolistAC } from "../todolistsSlice"
import { TaskPriority, TaskStatus } from "common/enums/enums"

let startState: TasksType

beforeEach(() => {
    startState = {
        todolistId1: [
            {
                id: "task1",
                title: "HTML&CSS",
                status: TaskStatus.Completed,
                description: null,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: null,
                todoListId: "todolistId1",
                order: 0,
                addedDate: "",
            },
            {
                id: "task2",
                title: "JS",
                status: TaskStatus.Completed,
                description: null,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: null,
                todoListId: "todolistId1",
                order: 0,
                addedDate: "",
            },
            {
                id: "task3",
                title: "React",
                status: TaskStatus.New,
                description: null,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: null,
                todoListId: "todolistId1",
                order: 0,
                addedDate: "",
            },
        ],
        todolistId2: [
            {
                id: "task1",
                title: "Rest API",
                status: TaskStatus.Completed,
                description: null,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: null,
                todoListId: "todolistId2",
                order: 0,
                addedDate: "",
            },
            {
                id: "task2",
                title: "GraphQL",
                status: TaskStatus.New,
                description: null,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: null,
                todoListId: "todolistId2",
                order: 0,
                addedDate: "",
            },
        ],
    }
})

test("correct task should be removed", () => {
    const endState = tasksReducer(startState, removeTaskAC({ taskId: "task1", todolistId: "todolistId1" }))

    expect(endState).toEqual({
        todolistId1: [
            {
                id: "task2",
                title: "JS",
                status: TaskStatus.Completed,
                description: null,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: null,
                todoListId: "todolistId1",
                order: 0,
                addedDate: "",
            },
            {
                id: "task3",
                title: "React",
                status: TaskStatus.New,
                description: null,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: null,
                todoListId: "todolistId1",
                order: 0,
                addedDate: "",
            },
        ],
        todolistId2: [
            {
                id: "task1",
                title: "Rest API",
                status: TaskStatus.Completed,
                description: null,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: null,
                todoListId: "todolistId2",
                order: 0,
                addedDate: "",
            },
            {
                id: "task2",
                title: "GraphQL",
                status: TaskStatus.New,
                description: null,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: null,
                todoListId: "todolistId2",
                order: 0,
                addedDate: "",
            },
        ],
    })
})

test("correct task should be added to correct array", () => {
    const newTitle = "New Task"

    const endState = tasksReducer(
        startState,
        addTaskAC({
            task: {
                description: null,
                title: newTitle,
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: null,
                id: v1(),
                todoListId: "todolistId1",
                order: 0,
                addedDate: "",
            },
        }),
    )

    expect(endState["todolistId1"].length).toBe(4)
    expect(endState["todolistId2"].length).toBe(2)
    expect(endState["todolistId1"][0].id).toBeDefined()
    expect(endState["todolistId1"][0].title).toBe(newTitle)
    expect(endState["todolistId1"][0].status).toBe(TaskStatus.New)
})

test("title of specified task should be changed", () => {
    const newTitle = "New Task"
    const endState = tasksReducer(
        startState,
        updateTaskAC({
            task: { ...startState["todolistId1"][0], title: newTitle },
        }),
    )

    expect(endState["todolistId2"][0].title).toBe("Rest API")
    expect(endState["todolistId1"][0].title).toBe(newTitle)
})

test("status of specified task should be changed", () => {
    const endState = tasksReducer(
        startState,
        updateTaskAC({
            task: {
                ...startState["todolistId1"][0],
                status: TaskStatus.New,
            },
        }),
    )

    expect(endState["todolistId2"][0].status).toBe(TaskStatus.Completed)
    expect(endState["todolistId1"][0].status).toBe(TaskStatus.New)
})

test("new array should be added when new todolist is added", () => {
    const endState = tasksReducer(
        startState,
        addTodolistAC({
            todolist: {
                id: "newId",
                title: "New Todolist",
                addedDate: "",
                order: 0,
            },
        }),
    )

    const keys = Object.keys(endState)
    const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
    const action = removeTodolistAC({ id: "todolistId2" })

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).not.toBeDefined()
    // or
    expect(endState["todolistId2"]).toBeUndefined()
})
