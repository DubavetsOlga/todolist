import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { MenuButton } from "common/components"
import Switch from "@mui/material/Switch"
import { changeTheme, selectIsLoggedIn, setIsLoggedIn } from "app/appSlice"
import { useAppSelector } from "common/hooks/useAppSelector"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { getTheme } from "common/theme/theme"
import { LinearProgress } from "@mui/material"
import { ResultCode } from "common/enums/enums"
import { useLogoutMutation } from "../../../features/auth/api/authApi"
import { baseApi } from "app/baseApi"

export const Header = () => {
    const themeMode = useAppSelector((state) => state.app.themeMode)
    const status = useAppSelector((state) => state.app.status)
    const dispatch = useAppDispatch()
    const theme = getTheme(themeMode)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const [logout] = useLogoutMutation()

    const logoutHandler = () => {
        logout()
            .then((res) => {
                if (res.data?.resultCode === ResultCode.Success) {
                    dispatch(setIsLoggedIn({ isLoggedIn: false }))
                    localStorage.removeItem("sn-token")
                    //dispatch(baseApi.util.resetApiState())
                }
            })
            .then(() => {
                dispatch(baseApi.util.invalidateTags(['Task', 'Todolist']))
            })
    }

    const changeModeHandler = () => {
        dispatch(changeTheme({ themeMode: themeMode === "light" ? "dark" : "light" }))
    }

    return (
        <AppBar position="static" sx={{ mb: "30px" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <IconButton color="inherit">
                    <MenuIcon />
                </IconButton>
                <div>
                    {isLoggedIn && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
                    <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                    <Switch color={"default"} onChange={changeModeHandler} checked={themeMode === "dark"} />
                </div>
            </Toolbar>
            {status === "loading" && <LinearProgress />}
        </AppBar>
    )
}
