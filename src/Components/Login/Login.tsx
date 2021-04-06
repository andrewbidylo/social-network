
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/auth'
import { Redirect } from 'react-router-dom'
import {LoginReduxForm} from './LoginForm'
import { AppStateType } from '../../redux/redaxStore'
import { LoginFormValueType } from './LoginForm'



export const Login: React.FC = (props) => {
    // HOOKS
    const captchaUrl = useSelector ((state: AppStateType )=> state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch()
    const onSubmit = (formData: LoginFormValueType) => {
        dispatch (login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    // After login redirect to profile
    if (isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    )
}
