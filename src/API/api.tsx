import axios from 'axios'
import { UsersType } from '../types/types'


export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: { 'API-KEY': 'd618681d-5127-4a3e-9e7d-3a31a4044010' }
})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,

}
export enum ResultCodeEnumForCaptcha {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}


export type ApiResponseType<D = {}, RC = ResultCodeEnum> = {
    resultCode: RC
    messages: Array<string>
    data: D
}








