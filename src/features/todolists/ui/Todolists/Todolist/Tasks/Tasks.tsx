import List from "@mui/material/List"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { FilterValuesType } from "../Todolist"
import { Task } from "./Task/Task"
import { DomainTodolist } from "../../../../api/todolistsApi.types"
import { TasksSkeleton } from "features/todolists/ui/skeletons/TasksSkeleton/TasksSkeleton"
import { TasksPagination } from "../TasksPagination/TasksPagination"
import { useTasks } from "common/hooks/useTasks"

type Props = {
    todolist: DomainTodolist
    filter: FilterValuesType
}

export const Tasks = ({ todolist, filter }: Props) => {
    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const { tasks, isLoading, totalCount, page, setPage } = useTasks(todolist, filter)

    if (isLoading) {
        return <TasksSkeleton />
    }

    return (
        <>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <>
                    <List ref={listRef}>
                        {tasks.map((task) => {
                            return <Task task={task} todolist={todolist} key={task.id} />
                        })}
                    </List>
                    <TasksPagination totalCount={totalCount || 0} page={page} setPage={setPage} />
                </>
            )}
        </>
    )
}
