import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { MenuButton } from "common/components"
import Switch from "@mui/material/Switch"
import { changeThemeAC } from "app/app-reducer"
import { useAppSelector } from "common/hooks/useAppSelector"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { getTheme } from "common/theme/theme"
import { logoutTC } from "../../../features/auth/model/auth-reducer"
import { selectIsLoggedIn } from "app/appSelectors"
import { LinearProgress } from "@mui/material"

export const Header = () => {
    const themeMode = useAppSelector((state) => state.app.themeMode)
    const status = useAppSelector((state) => state.app.status)
    const dispatch = useAppDispatch()
    const theme = getTheme(themeMode)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"))
    }

    const onLogout = () => {
        dispatch(logoutTC())
    }

    return (
        <AppBar position="static" sx={{ mb: "30px" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <IconButton color="inherit">
                    <MenuIcon />
                </IconButton>
                <div>
                    {isLoggedIn && <MenuButton onClick={onLogout}>Logout</MenuButton>}
                    <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                    <Switch color={"default"} onChange={changeModeHandler} checked={themeMode === "dark"}/>
                </div>
            </Toolbar>
            {status === "loading" && <LinearProgress />}
        </AppBar>
    )
}
