import { SyntheticEvent } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useAppSelector } from "common/hooks/useAppSelector"
import { setAppErrorAC } from "app/app-reducer"
import { useAppDispatch } from "common/hooks/useAppDispatch"

export const ErrorSnackbar = () => {
    const error = useAppSelector((state) => state.app.error)
    const dispatch = useAppDispatch()

    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        dispatch(setAppErrorAC(null))
    }

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>
    )
}
