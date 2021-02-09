import { profileAPI, usersAPI } from './../../src/API/api'

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'

let initialState = {
    postData: [
        { id: '1', message: 'Hi, how are you?', likesCount: 10 },
        { id: '2', message: 'What are you doing?', likesCount: 2 },
        { id: '3', message: 'Lol', likesCount: 3 },
        { id: '3', message: 'Lol', likesCount: 3 },
        { id: '3', message: 'Lol', likesCount: 3 },
    ],
    profile: null,
    status: ""
}


const profilePageReducer = (state = initialState, action) => {


    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 6,
                message: action.newPostText,
                likesCount: 7
            };
            return { ...state, postData: [...state.postData, newPost], newPostText: '' }

        case DELETE_POST:
            return { ...state, postData: state.postData.filter(p => p.id != action.postId) }

        case SET_USER_PROFILE:
            return { ...state, profile: action.profile }
        case SET_STATUS:
            return { ...state, status: action.status }

        default:
            return state
    }
}

// Action creators

export const addPostActionCreator = (newPostText) => {
    return {
        type: ADD_POST, newPostText
    }
}
export const deletePost = (postId) => {
    return {
        type: DELETE_POST, postId
    }
}
export const setUserProfile = (profile) => {
    return { type: SET_USER_PROFILE, profile }
}
export const setStatus = (status) => {
    return { type: SET_STATUS, status }
}

// Thank createros

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}



export default profilePageReducer;
