import { stopSubmit } from 'redux-form'
import {ResultCodeEnum, ResultCodeEnumForCaptcha} from '../API/api'
import { authAPI } from '../API/auth-api'
import { securityAPI } from '../API/securuty-api'
const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CUPTCHA_URL_SUCCESS = 'auth/GET_CUPTCHA_URL_SUCCESS'



let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null // is null, then captcha is not required

}
export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case GET_CUPTCHA_URL_SUCCESS:
        case SET_USER_DATA:
            return { ...state, ...action.payload }

        default:
            return state
    }
}
type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload:SetAuthUserDataActionPayloadType
}

// Action creators
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean):SetAuthUserDataActionType => {
    return { type: SET_USER_DATA, payload: { userId, email, login, isAuth } }
}

type getCuptchaUrlSuccessActionType = {
    type: typeof GET_CUPTCHA_URL_SUCCESS,
    payload:{captchaUrl: string}
}
export const getCuptchaUrlSuccess = (captchaUrl: string):getCuptchaUrlSuccessActionType => {
    return { type: GET_CUPTCHA_URL_SUCCESS, payload: { captchaUrl } }
}


// Thanks creators // Return Thanks
export const getAuthUserData = () => async (dispatch: any) => {
    const response = await authAPI.me()
    if (response.data.resultCode === ResultCodeEnum.Success) {
        let { id, email, login } = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}


export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    // Success get auth data
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData())
        // Field error
    }
    else {
        if (response.data.resultCode === ResultCodeEnumForCaptcha.CaptchaIsRequired){
            dispatch (getCuptchaUrl())
        }

        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some erorr"
        dispatch(stopSubmit('login', { _error: message }))
    }
}
export const logout = () => async (dispatch: any) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCuptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCupthaUrl()
    const CuptchaUrl = response.data.url
    dispatch(getCuptchaUrlSuccess(CuptchaUrl))

}


export default authReducer;
