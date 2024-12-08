import s from "./App.module.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "common/theme/theme"
import { ErrorSnackbar, Header } from "common/components"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectIsInitialized, selectThemeMode } from "./appSelectors"
import { Routing } from "common/routing"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useEffect } from "react"
import { initializeAppTC } from "../features/auth/model/auth-reducer"
import CircularProgress from '@mui/material/CircularProgress'

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
