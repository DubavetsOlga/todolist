import "./App.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "common/theme/theme"
import { Header } from "common/components"
import { Main } from "./Main"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectThemeMode } from "./appSelectors"


function App() {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <Main />
            </ThemeProvider>
        </div>
    )
}

export default App
