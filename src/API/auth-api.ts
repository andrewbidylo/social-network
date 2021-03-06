import { instance, ApiResponseType, ResultCodeEnum, ResultCodeEnumForCaptcha} from "./api"



type MeResponseDataType = {
        id: number
        email: string
        login: string
}

type LoginResponseDataType = {
   userId:number

}
type LogoutResponseType = {
    data: {}
}

// Requests to API for authorize, login, logout etc.
export const authAPI = {
    me() {
        return instance.get<ApiResponseType <MeResponseDataType>>(`auth/me`)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = 'null') {
        return instance.post<ApiResponseType <LoginResponseDataType, ResultCodeEnum| ResultCodeEnumForCaptcha>>(`/auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return instance.delete<ApiResponseType<LogoutResponseType>>(`/auth/login`)
    }
}
