import { stopSubmit } from 'redux-form'
import { authAPI } from '../API/api'
const SET_USER_DATA = 'SET_USER_DATA'


let initialState = {
        UserId: null,
        email: null,
        login: null,
        isAuth: false

}


const authReducer = (state = initialState, action) => {
    

    switch (action.type){

    case SET_USER_DATA:
        return {...state, ...action.data, isAuth: true}
    
    default:
        return state
    }
}

// Action creator
export const setAuthUserData = (userId, email, login) => {
    return { type: SET_USER_DATA, data: {userId, email, login}}
}

// Thank creators //
export const getAuthUserData = () => (dispatch) => { 
    return authAPI.me()
    .then(response  => {
        
        if (response.data.resultCode === 0){
            let {id, email, login}=response.data.data
            dispatch (setAuthUserData(id, email, login, true))}
})}


export const login = (email, password, reemberMe) => (dispatch) => { 
    authAPI.login(email, password, reemberMe)
    
    .then(response  => {
        if (response.data.resultCode === 0){
            dispatch (getAuthUserData())
            // Field error
            
        } 
        else  {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some erorr"

            debugger
            dispatch (stopSubmit ('login' ,{_error: message}))}
    })
}
export const logout = () => (dispatch) => { 
    authAPI.logout()
    .then(response  => {
        if (response.data.resultCode === 0){
            dispatch (setAuthUserData(null, null, null, false))
        }
    })
}

export default authReducer;
