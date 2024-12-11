import s from "./Page404.module.css"
import Button from "@mui/material/Button"
import { Link } from "react-router"
import { Path } from "common/routing/Routing"

export const Page404 = () => {
    return (
        <>
            <h1 className={s.title}>404</h1>
            <h2 className={s.subTitle}>page not found</h2>
            <div className={s.buttonBox}>
                <Button variant={"contained"} component={Link} to={`/${Path.Login}`} sx={{ m: 0 }}>
                    Go to main
                </Button>
            </div>
        </>
    )
}
