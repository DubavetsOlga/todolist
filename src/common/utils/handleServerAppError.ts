import { BaseResponse } from "common/types"
import { Dispatch } from "redux"
import { setAppError, setAppStatus } from "app/appSlice"

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
    dispatch(setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }))
    dispatch(setAppStatus({ status: "failed" }))
}
