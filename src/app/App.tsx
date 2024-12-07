import "./App.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "common/theme/theme"
import { Header } from "common/components"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectThemeMode } from "./appSelectors"
import { Routing } from "common/routing"

function App() {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <Routing />
            </ThemeProvider>
        </div>
    )
}

export default App
