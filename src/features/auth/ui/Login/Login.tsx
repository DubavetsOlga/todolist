import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid2"
import { Navigate } from "react-router"
import { useLogin } from "common/hooks/useLogin"
import { LoginFormLabel } from "./LoginFormLabel/LoginFormLabel"
import { LoginForm } from "./LoginForm/LoginForm"

export const Login = () => {
    const { isLoggedIn } = useLogin()

    if (isLoggedIn) {
        return <Navigate to={"/"} />
    }

    return (
        <Grid container justifyContent={"center"}>
            <FormControl>
                <LoginFormLabel />
                <LoginForm />
            </FormControl>
        </Grid>
    )
}
