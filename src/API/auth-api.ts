import { instance, ResponceType, ResultCodeEnum, ResultCodeEnumForCaptcha} from "./api"



type MeResponceDataType = {
        id: number
        email: string
        login: string
}

type LoginResponceDataType = {
   userId:number

}
type LogoutResponceType = {
    data: {}
}

// Requests to API for authorize, login, logout etc.
export const authAPI = {
    me() {
        return instance.get<ResponceType <MeResponceDataType>>(`auth/me`)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = 'null') {
        return instance.post<ResponceType <LoginResponceDataType, ResultCodeEnum| ResultCodeEnumForCaptcha>>(`/auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return instance.delete<ResponceType<LogoutResponceType>>(`/auth/login`)
    }
}
