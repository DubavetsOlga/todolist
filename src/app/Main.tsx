import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import { AddItemForm } from "common/components"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useNavigate } from "react-router"
import { useAppSelector } from "common/hooks/useAppSelector"
import { useEffect } from "react"
import { Path } from "common/routing/Routing"
import { useAddTodolistMutation } from "../features/todolists/api/todolistsApi"
import { selectIsLoggedIn } from "app/appSlice"

export const Main = () => {
    const [addTodolist] = useAddTodolistMutation()

    const navigate = useNavigate()

    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(Path.Login)
        }
    }, [isLoggedIn])

    const addTodolistCallback = (title: string) => {
        addTodolist(title)
    }

    return (
        <Container fixed>
            <Grid container sx={{ mb: "30px" }}>
                <AddItemForm addItem={addTodolistCallback} />
            </Grid>
            <Grid container spacing={4}>
                <Todolists />
            </Grid>
        </Container>
    )
}
