import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { Todolist } from "./Todolist/Todolist";
import { useAppSelector } from "../../../../common/hooks/useAppSelector";
import { selectTodolists } from "../../../../app/appSelectors";

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

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
