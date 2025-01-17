export const AppHttpRequests = () => {
    return <></>
}
// import Checkbox from "@mui/material/Checkbox"
// import React, { ChangeEvent, useEffect, useState } from "react"
// import { AddItemForm } from "common/components"
// import { EditableSpan } from "common/components"
// import { TodolistType } from "../features/todolists/api/todolistsApi.types"
// import { DomainTask, UpdateTaskModel } from "../features/todolists/api/tasksApi.types"
// import { todolistsApi } from "../features/todolists/api/todolistsApi"
// import { tasksApi } from "../features/todolists/api/tasksApi"
// import { TaskStatus } from "common/enums/enums"
//
// export const AppHttpRequests = () => {
//     const [todolists, setTodolists] = useState<TodolistType[]>([])
//     const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})
//
//     useEffect(() => {
//         todolistsApi.getTodolists().then((res) => {
//             setTodolists(res.data)
//
//             res.data.forEach((tl) => {
//                 tasksApi.getTasks(tl.id).then((resTasks) => {
//                     setTasks((prev) => ({ ...prev, [tl.id]: resTasks.data.items }))
//                 })
//             })
//         })
//     }, [])
//
//     const createTodolistHandler = (title: string) => {
//         todolistsApi.createTodolist(title).then((res) => {
//             const newTodolist = res.data.data.item
//             setTodolists([newTodolist, ...todolists])
//             setTasks((prev) => ({ ...prev, [newTodolist.id]: [] }))
//         })
//     }
//
//     const removeTodolistHandler = (id: string) => {
//         todolistsApi.deleteTodolist(id).then(() => setTodolists((prev) => prev.filter((tl) => tl.id !== id)))
//     }
//
//     const updateTodolistHandler = (id: string, title: string) => {
//         todolistsApi
//             .updateTodolist({ id, title })
//             .then(() => setTodolists((prev) => prev.map((tl) => (tl.id === id ? { ...tl, title } : tl))))
//     }
//
//     const createTaskHandler = (title: string, todolistId: string) => {
//         tasksApi.createTask({ todolistId, title }).then((res) => {
//             const newTask = res.data.data.item
//             setTasks((prev) => ({ ...prev, [todolistId]: [newTask, ...prev[todolistId]] }))
//         })
//     }
//
//     const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
//         const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
//
//         const model: UpdateTaskModel = {
//             status,
//             title: task.title,
//             deadline: task.deadline,
//             description: task.description,
//             priority: task.priority,
//             startDate: task.startDate,
//         }
//
//         tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model: model }).then(() => {
//             const newTasks = tasks[task.todoListId].map((t) => (t.id === task.id ? { ...t, ...model } : t))
//             setTasks({ ...tasks, [task.todoListId]: newTasks })
//         })
//     }
//
//     const changeTaskTitleHandler = (title: string, task: DomainTask) => {
//         const model: UpdateTaskModel = {
//             status: task.status,
//             title: title,
//             deadline: task.deadline,
//             description: task.description,
//             priority: task.priority,
//             startDate: task.startDate,
//         }
//
//         tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model: model }).then(() => {
//             const newTasks = tasks[task.todoListId].map((t) => (t.id === task.id ? { ...t, ...model } : t))
//             setTasks({ ...tasks, [task.todoListId]: newTasks })
//         })
//     }
//
//     const removeTaskHandler = (taskId: string, todolistId: string) => {
//         tasksApi
//             .deleteTask({ todolistId, taskId })
//             .then(() =>
//                 setTasks((prev) => ({ ...prev, [todolistId]: prev[todolistId].filter((t) => t.id !== taskId) })),
//             )
//     }
//
//     return (
//         <div style={{ margin: "20px" }}>
//             <AddItemForm addItem={createTodolistHandler} />
//
//             {/* Todolists */}
//             {todolists.map((tl) => {
//                 return (
//                     <div key={tl.id} style={todolist}>
//                         <div>
//                             <EditableSpan
//                                 value={tl.title}
//                                 onChange={(title: string) => updateTodolistHandler(tl.id, title)}
//                             />
//                             <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
//                         </div>
//                         <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />
//
//                         {/* Tasks */}
//                         {!!tasks[tl.id] &&
//                             tasks[tl.id].map((task: DomainTask) => {
//                                 return (
//                                     <div key={task.id}>
//                                         <Checkbox
//                                             checked={task.status === 2 ? true : false}
//                                             onChange={(e) => changeTaskStatusHandler(e, task)}
//                                         />
//                                         <EditableSpan
//                                             value={task.title}
//                                             onChange={(title) => changeTaskTitleHandler(title, task)}
//                                         />
//                                         <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
//                                     </div>
//                                 )
//                             })}
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }
//
// // Styles
// const todolist: React.CSSProperties = {
//     border: "1px solid black",
//     margin: "20px 0",
//     padding: "10px",
//     width: "300px",
//     display: "flex",
//     justifyContent: "space-between",
//     flexDirection: "column",
// }
