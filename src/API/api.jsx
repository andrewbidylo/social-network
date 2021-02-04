import * as axios from 'axios'


const instance = axios.create ({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY' : 'd618681d-5127-4a3e-9e7d-3a31a4044010'}
})

export const usersAPI = {
    getUsers (currentPage, pageSize){ 
        return (instance.get(`users?page=${currentPage} & count = ${pageSize}`)
        
        )
        .then(response => response.data)},
    
    follow (userId)  {
        return  instance.post(`/follow/${userId}`)

    },

    unfollow (userId) {
        return  instance.delete(`follow/${userId}`)

    },
    getProfile (userId) {
        console.warn('Woo')
        return profileAPI.getProfile(userId)
    },
        
}
export const profileAPI = {
    getProfile (userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus (userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus (status) {
        return instance.put(`profile/status/`, {status: status})
    },
        
}

// Requests to API for authorize, login, logout etc.
export const authAPI = {
    me () {
    return instance.get(`auth/me`)},
    login (email, password,rememberMe = false) {
        return instance.post(`/auth/login`, {email, password,rememberMe})
    },
    logout () {
        return instance.delete(`/auth/login`)
    }
}


 
