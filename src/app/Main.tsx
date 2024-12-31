import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import { AddItemForm } from "common/components"
import { addTodolistTC } from "../features/todolists/model/todolistsSlice"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useNavigate } from "react-router"
import { useAppSelector } from "common/hooks/useAppSelector"
import { useEffect } from "react"
import { Path } from "common/routing/Routing"
import { selectIsLoggedIn } from "../features/auth/model/authSlice"

export const Main = () => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(Path.Login)
        }
    }, [isLoggedIn])

    const addTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    return (
        <Container fixed>
            <Grid container sx={{ mb: "30px" }}>
                <AddItemForm addItem={addTodolist} />
            </Grid>
            <Grid container spacing={4}>
                <Todolists />
            </Grid>
        </Container>
    )
}
