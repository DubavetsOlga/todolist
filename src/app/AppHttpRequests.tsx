import Checkbox from '@mui/material/Checkbox'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm'
import { EditableSpan } from '../common/components/EditableSpan/EditableSpan'
import axios from 'axios'

const baseUrl = 'https://social-network.samuraijs.com/api/1.1/todo-lists'

const options = {
        headers: {
        
    }
}

type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}

type FieldError = {
    error: string
    field: string
}

type Response<T = {}> = {
    data: T
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}

type DomainTask = {
    description: string | null
    title: string
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type UpdateTaskModel = Omit<DomainTask, "id" | "todoListId" | "order" | "addedDate">


export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

    useEffect(() => {
        axios.get<Todolist[]>(baseUrl, options)
            .then(res => {
                setTodolists(res.data)

                res.data.forEach(tl => {
                    axios.get<GetTasksResponse>(`${baseUrl}/${tl.id}/tasks`, options)
                        .then(resTasks => {
                            setTasks(prev => ({ ...prev, [tl.id]: resTasks.data.items }))
                        })
                    })
            })
    }, [])

    const createTodolistHandler = (title: string) => {
        axios.post<Response<{ item: Todolist }>>(baseUrl, { title }, options )
            .then(res => {
                const newTodolist = res.data.data.item
                setTodolists([newTodolist, ...todolists])
                setTasks(prev => ({ ...prev, [newTodolist.id]: [] }))
            })
    }

    const removeTodolistHandler = (id: string) => {
        axios.delete<Response>(`${baseUrl}/${id}`, options)
            .then(() => setTodolists(prev => prev.filter(tl => tl.id !== id)))
        }

    const updateTodolistHandler = (id: string, title: string) => {
        axios.put(`${baseUrl}/${id}`, { title }, options)
            .then(() => setTodolists(prev => prev.map(tl => tl.id === id ? {...tl, title} : tl)))
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        axios.post<Response<{ item: DomainTask }>>(`${baseUrl}/${todolistId}/tasks`, { title }, options)
            .then(res => {
                const newTask = res.data.data.item
                setTasks(prev => ({ ...prev, [todolistId]: [newTask, ...prev[todolistId]] }))
            })
        }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
        let status = e.currentTarget.checked ? 2 : 0

        const model: UpdateTaskModel = {
            status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }

        axios.put<Response<{ item: DomainTask }>>(`${baseUrl}/${task.todoListId}/tasks/${task.id}`, model, options)
            .then(() => {
                const newTasks = tasks[task.todoListId].map(t => (t.id === task.id ? { ...t, ...model } : t))
                setTasks({ ...tasks, [task.todoListId]: newTasks })
            })
    }

    const changeTaskTitleHandler = (title: string, task: DomainTask) => {
        const model: UpdateTaskModel = {
            status: task.status,
            title: title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }

        axios.put<Response<{ item: DomainTask }>>(`${baseUrl}/${task.todoListId}/tasks/${task.id}`, model, options)
            .then(() => {
                const newTasks = tasks[task.todoListId].map(t => (t.id === task.id ? { ...t, ...model } : t))
                setTasks({ ...tasks, [task.todoListId]: newTasks })
            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        axios.delete<Response>(`${baseUrl}/${todolistId}/tasks/${taskId}`, options)
            .then(() => setTasks(prev => (
                { ...prev, [todolistId]: prev[todolistId].filter(t => t.id !== taskId) }
            ))
        )
    }


    return (
        <div style={{ margin: '20px' }}>
            <AddItemForm addItem={createTodolistHandler} />

            {/* Todolists */}
            {todolists.map((tl) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                value={tl.title}
                                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)} />

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: DomainTask) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === 2 ? true : false}
                                            onChange={e => changeTaskStatusHandler(e, task)}
                                        />
                                        <EditableSpan
                                            value={task.title}
                                            onChange={title => changeTaskTitleHandler(title, task)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}
