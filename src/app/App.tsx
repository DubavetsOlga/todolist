import s from "./App.module.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "common/theme/theme"
import { ErrorSnackbar, Header } from "common/components"
import { useAppSelector } from "common/hooks/useAppSelector"
import { Routing } from "common/routing"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useEffect } from "react"
import { initializeAppTC, selectIsInitialized } from "../features/auth/model/authSlice"
import CircularProgress from '@mui/material/CircularProgress'
import { selectThemeMode } from "app/appSlice"

function App() {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)
    const isInitialized = useAppSelector(selectIsInitialized)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return (
            <div className={s.circularProgressContainer}>
                <CircularProgress size={150} thickness={3} />
            </div>
        )
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <Routing />
                <ErrorSnackbar />
            </ThemeProvider>
        </div>
    )
}

export default App
