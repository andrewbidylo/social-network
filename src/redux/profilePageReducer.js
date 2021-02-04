import {profileAPI, usersAPI} from './../../src/API/api'

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'


let initialState = {
    postData: [
        {id:'1', message: 'Hi, how are you?', likesCount: 10},
         {id:'2', message: 'What are you doing?', likesCount: 2},
         {id:'3', message: 'Lol', likesCount: 3},
         {id:'3', message: 'Lol', likesCount: 3},
         {id:'3', message: 'Lol', likesCount: 3},
         ],
    profile : null,
    status: ""
}


const profilePageReducer = (state = initialState, action) => {
    

    switch (action.type){
    case ADD_POST:
    let newPost = { 
        id: 6,
        message: action.newPostText,
        likesCount: 7
        };
        return {...state, postData: [...state.postData, newPost], newPostText: ''}


    case SET_USER_PROFILE:
        return {...state, profile: action.profile}
    case SET_STATUS:
        return {...state, status: action.status}
    
    default:
        return state
    }
}

// Action creators

export const addPostActionCreator = (newPostText) => {
    return { type: ADD_POST,newPostText
    }
}
export const setUserProfile = (profile) => {
    return { type: SET_USER_PROFILE, profile}
}
export const setStatus = (status) => {
    return { type: SET_STATUS, status}
}

// Thank createros

export const getUserProfile = (userId) => (dispatch) => {
    return usersAPI.getProfile(userId)
    .then(response  => {
        dispatch (setUserProfile(response.data))      
})}

export const getStatus = (userId) => (dispatch) => {
    return profileAPI.getStatus(userId)
    .then(response  => {
        debugger
        dispatch (setStatus(response.data))       
})} 

export const updateStatus = (status) => (dispatch) => {
    return profileAPI.updateStatus(status)
    .then(response  => {
        if (response.data.resultCode === 0){
        dispatch (setStatus(status))       
        }
    })}
    


export default profilePageReducer;
