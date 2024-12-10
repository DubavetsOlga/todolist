import { Input } from "@mui/material"
import { ChangeEvent, useState } from "react"

type PropsType = {
    value: string
    onChange: (newTitle: string) => void
    disabled?: boolean
}

export const EditableSpan = ({ value, onChange, disabled }: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const activateEditModeHandler = () => {
        if (disabled) return;
        setEditMode(true)
    }

    const deactivateEditModeHandler = () => {
        setEditMode(false)
        onChange(title)
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <>
            {editMode ? (
                <Input
                    value={title}
                    size={"small"}
                    onChange={changeTitleHandler}
                    onBlur={deactivateEditModeHandler}
                    autoFocus
                />
            ) : (
                <span onDoubleClick={activateEditModeHandler}>{value}</span>
            )}
        </>
    )
}
