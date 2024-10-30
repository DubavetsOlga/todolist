import { TasksStateType } from "../App"


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id) }
        case 'ADD-TASK':
            const newTask = {
                id: action.payload.id,
                title: action.payload.title,
                isDone: false
            }
            return { ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId]
                        .map(t => (t.id == action.payload.id ? { ...t, isDone: action.payload.taskStatus } : t)),
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId]
                        .map(t => (t.id == action.payload.id ? { ...t, title: action.payload.title } : t)),
            }
        default:
            return state
    }
}

export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        payload: { id, todolistId },
    }
}

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        id: string
        todolistId: string
    }
}

export const addTaskAC = (title: string, id: string, todolistId: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            id,
            todolistId
        },
    }
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: {
        title: string
        id: string
        todolistId: string
    }
}

export const changeTaskStatusAC = (id: string, todolistId: string, taskStatus: boolean): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            id,
            todolistId,
            taskStatus
        },
    }
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        id: string
        todolistId: string
        taskStatus: boolean
    }
}

export const changeTaskTitleAC = (id: string, todolistId: string, title: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            id,
            todolistId,
            title
        },
    }
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
        id: string
        todolistId: string
        title: string
    }
}


type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType
