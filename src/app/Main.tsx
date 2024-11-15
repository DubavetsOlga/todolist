import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import { AddItemForm } from "./common/components/AddItemFor/AddItemForm";
import { useDispatch } from "react-redux";
import { v1 } from "uuid";
import { addTodolistAC } from "./model/todolists-reducer";
import { Todolists } from "./features/todolists/ui/Todolists/Todolists";

export const Main = () => {
    const dispatch = useDispatch()

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC({ id: v1(), title }))
    }

    return (
        <Container fixed>
            <Grid container sx={{ mb: '30px' }}>
                <AddItemForm addItem={addTodolist} />
            </Grid>
            <Grid container spacing={4}>
                <Todolists />
            </Grid>
        </Container>
    )
}
