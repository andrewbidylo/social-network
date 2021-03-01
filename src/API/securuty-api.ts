import { instance } from "./api"

export const securityAPI = {
    getCupthaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}