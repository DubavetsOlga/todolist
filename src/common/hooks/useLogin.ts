import { selectIsLoggedIn, setIsLoggedIn } from "app/appSlice"
import { useAppSelector } from "common/hooks/useAppSelector"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useLoginMutation } from "../../features/auth/api/authApi"
import { SubmitHandler, useForm } from "react-hook-form"
import { LoginArgs } from "../../features/auth/api/authApi.types"
import { ResultCode } from "common/enums/enums"

export const useLogin = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const dispatch = useAppDispatch()

    const [login] = useLoginMutation()

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<LoginArgs>({ defaultValues: { email: "", password: "", rememberMe: false } })

    const onSubmit: SubmitHandler<LoginArgs> = (data) => {
        login(data)
            .then((res) => {
                if (res.data?.resultCode === ResultCode.Success) {
                    dispatch(setIsLoggedIn({ isLoggedIn: true }))
                    localStorage.setItem("sn-token", res.data.data.token)
                }
            })
            .finally(() => {
                reset()
            })
    }

    return { isLoggedIn, handleSubmit, onSubmit, control, errors, register }
}
