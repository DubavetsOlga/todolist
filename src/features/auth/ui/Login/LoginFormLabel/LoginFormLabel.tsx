import FormLabel from "@mui/material/FormLabel"

export const LoginFormLabel = () => {
    return (
        <FormLabel>
            <p>
                To login get registered
                <a
                    style={{ marginLeft: "5px" }}
                    href={"https://social-network.samuraijs.com/"}
                    target={"_blank"}
                    rel="noreferrer"
                >
                    here
                </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
                <b>Email:</b> free@samuraijs.com
            </p>
            <p>
                <b>Password:</b> free
            </p>
        </FormLabel>
    )
}
