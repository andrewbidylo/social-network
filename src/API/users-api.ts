import { ApiResponseType, GetItemsType, instance } from './api'

export const    usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return (instance.get <GetItemsType>(`users?page=${currentPage} & count = ${pageSize}`)

        )
            .then(response => response.data)
    },

    follow(userId: number) {
        return instance.post<ApiResponseType>(`/follow/${userId}`).then(res => res.data)

    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise <ApiResponseType>

    },
}