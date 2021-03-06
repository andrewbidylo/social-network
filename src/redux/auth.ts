import { FormAction, stopSubmit } from 'redux-form'
import { ResultCodeEnum, ResultCodeEnumForCaptcha } from '../API/api'
import { authAPI } from '../API/auth-api'
import { securityAPI } from '../API/securuty-api'
import { BaseThunkType, InferActionsTypes } from './redaxStore'

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null // is null, then captcha is not required

}
export type InitialStateType = typeof initialState


// Reducer
const authReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SN/AUTH/GET_CUPTCHA_URL_SUCCESS':
        case 'SN/AUTH/SET_USER_DATA':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

type ActionsType = InferActionsTypes<typeof actions>

// Action creators
const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SN/AUTH/SET_USER_DATA', payload: { userId, email, login, isAuth }
    } as const),
    getCuptchaUrlSuccess: (captchaUrl: string) => ({ type: 'SN/AUTH/GET_CUPTCHA_URL_SUCCESS', payload: { captchaUrl } } as const)
}

type ThunkType = BaseThunkType<ActionsType | FormAction>

// Thank creators // Return Thanks
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const response = await authAPI.me()
    if (response.data.resultCode === ResultCodeEnum.Success) {
        let { id, email, login } = response.data.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string):
    ThunkType => async (dispatch) => {
        const response = await authAPI.login(email, password, rememberMe, captcha)
        // Success get auth data
        if (response.data.resultCode === ResultCodeEnum.Success) {
            dispatch(getAuthUserData())
            // Field error
        }
        else {
            if (response.data.resultCode === ResultCodeEnumForCaptcha.CaptchaIsRequired) {
                dispatch(getCuptchaUrl())
            }

            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some erorr"
            dispatch(stopSubmit('login', { _error: message }))
        }
    }
export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export const getCuptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCupthaUrl()
    const CuptchaUrl = response.data.url
    dispatch(actions.getCuptchaUrlSuccess(CuptchaUrl))

}


export default authReducer;
