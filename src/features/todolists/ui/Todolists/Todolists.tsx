import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { Todolist } from "./Todolist/Todolist"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectTodolists } from "app/appSelectors"
import { useEffect } from "react"
import { fetchTodolistsTC } from "../../model/todolists-reducer"
import { useAppDispatch } from "common/hooks/useAppDispatch"

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    return (
        <>
            {todolists.map((tl) => {
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
