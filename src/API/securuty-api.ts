import { instance } from "./api"

type GetCupthaUrlResponseType = {
    url: string
}

export const securityAPI = {
    getCupthaUrl() {
        return instance.get <GetCupthaUrlResponseType> (`security/get-captcha-url`)
    }
}