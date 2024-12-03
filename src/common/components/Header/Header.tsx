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

export const Header = () => {
    const themeMode = useAppSelector((state) => state.app.themeMode)

    const dispatch = useAppDispatch()

    const theme = getTheme(themeMode)

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"))
    }

    return (
        <AppBar position="static" sx={{ mb: "30px" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <IconButton color="inherit">
                    <MenuIcon />
                </IconButton>
                <div>
                    <MenuButton>Login</MenuButton>
                    <MenuButton>Logout</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                    <Switch color={"default"} onChange={changeModeHandler} />
                </div>
            </Toolbar>
        </AppBar>
    )
}
