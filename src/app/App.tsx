import s from "./App.module.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "common/theme/theme"
import { ErrorSnackbar, Header } from "common/components"
import { useAppSelector } from "common/hooks/useAppSelector"
import { Routing } from "common/routing"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useEffect, useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import { selectThemeMode, setIsLoggedIn } from "app/appSlice"
import { ResultCode } from "common/enums/enums"
import { useMeQuery } from "../features/auth/api/authApi"

function App() {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)
    const [isInitialized, setIsInitialized] = useState(false)

    const dispatch = useAppDispatch()

    const { data, isLoading } = useMeQuery()

    useEffect(() => {
        if (!isLoading) {
            setIsInitialized(true)
            if (data?.resultCode === ResultCode.Success) {
                dispatch(setIsLoggedIn({ isLoggedIn: true }))
            }
        }
    }, [isLoading, data])

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
