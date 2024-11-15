import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { Todolist } from "../../../../Todolist";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { TodolistType } from "../../../../app/App";

export const Todolists = () => {
    const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)

    return (
        <>
            {todolists.map(tl => {
                return (
                    <Grid key={tl.id}>
                        <Paper sx={{ p: '0 20px 20px 20px' }}>
                            <Todolist todolist={tl} />
                        </Paper>
                    </Grid>
                )})}
        </>
    )
}
