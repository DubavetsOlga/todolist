import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { Todolist } from "./Todolist/Todolist"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useGetTodolistsQuery } from "../../api/todolistsApi"

export const Todolists = () => {
    const { data: todolists } = useGetTodolistsQuery()

    //onst dispatch = useAppDispatch()

    // useEffect(() => {
    //     dispatch(fetchTodolistsTC())
    // }, [])

    return (
        <>
            {todolists?.map((tl) => {
                return (
                    <Grid key={tl.id}>
                        <Paper sx={{ p: "0 20px 20px 20px" }}>
                            <Todolist todolist={tl} />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    )
}
