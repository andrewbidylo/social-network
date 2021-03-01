import { PhotosType, ProfileType } from "../types/types"
import { instance, ResponceType } from "./api"

export type SavePhotosResponceDataType = {
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
        return instance.put <ResponceType> (`profile/status/`, { status: status }).then (res => res.data)
    },
    savePhoto(file: any) {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put <ResponceType <SavePhotosResponceDataType>>(`profile/photo/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then (res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put <ResponceType> (`profile/`, profile)

    }
}