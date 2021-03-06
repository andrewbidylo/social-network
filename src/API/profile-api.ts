import { PhotosType, ProfileType } from "../types/types"
import { instance, ApiResponseType } from "./api"

export type SavePhotosResponseDataType = {
    photos: PhotosType

}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get <ProfileType>(`profile/` + userId).then (res => res.data)
    },
    getStatus(userId: number) {
        return instance.get <string>(`profile/status/` + userId).then (res => res.data)
    },
    updateStatus(status: string) {
        return instance.put <ApiResponseType> (`profile/status/`, { status: status }).then (res => res.data)
    },
    savePhoto(file: File) {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put <ApiResponseType <SavePhotosResponseDataType>>(`profile/photo/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then (res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put <ApiResponseType> (`profile/`, profile)

    }
}