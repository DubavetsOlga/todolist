import TextField from "@mui/material/TextField"
import AddBoxIcon from "@mui/icons-material/AddBox"
import IconButton from "@mui/material/IconButton"
import { ChangeEvent, KeyboardEvent, useState } from "react"

type Props = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = ({ addItem, disabled }: Props) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (!title.trim()) {
            setError("Title is required")
            setTitle("")
            return
        }

        if (isTitleValid) {
            addItem(title.trim())
            setTitle("")
        }
    }

    const isTitleValid = title.length <= 100

    const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") {
            addItemHandler()
        }
    }

    return (
        <div>
            <TextField
                label="Enter a title"
                variant={"outlined"}
                className={error ? "error" : ""}
                value={title}
                size={"small"}
                error={!!error}
                helperText={error}
                onChange={changeItemHandler}
                onKeyUp={addItemOnKeyUpHandler}
                disabled={disabled}
            />
            <IconButton onClick={addItemHandler} color={"primary"} disabled={disabled || !isTitleValid}>
                <AddBoxIcon />
            </IconButton>
            {!isTitleValid && <div className={"error-message"}>Max length is 15</div>}
        </div>
    )
}
