import { stopSubmit } from 'redux-form'
import {} from '../API/api'
import { profileAPI } from '../API/profile-api'
import { PhotosType, PostDataType, ProfileType } from '../types/types'

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SET_PHOTO_SUCCESS = 'SET_PHOTO_SUCCESS'


let initialState = {
    postData: [
        { id: 1, message: 'Hi, how are you?', likesCount: 10 },
        { id: 2, message: 'What are you doing?', likesCount: 2 },
        { id: 3, message: 'Lol', likesCount: 3 },
        { id: 3, message: 'Lol', likesCount: 3 },
        { id: 3, message: 'Lol', likesCount: 3 },
    ] as Array<PostDataType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

type InitialStateType = typeof initialState


const profilePageReducer = (state = initialState, action: any): InitialStateType => {


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
        case SET_PHOTO_SUCCESS:
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }

        default:
            return state
    }
}




// Action creators

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => {
    return {
        type: ADD_POST, newPostText
    }
}
type DeletePostActionCreatorType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionCreatorType => {
    return {
        type: DELETE_POST, postId
    }
}
type SetUserProfileActionCreatorType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionCreatorType => {
    return { type: SET_USER_PROFILE, profile }
}

type SetStatusActionCreatorType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionCreatorType => {
    return { type: SET_STATUS, status }
}
type SetPhotoSuccessCreatorType = {
    type: typeof SET_PHOTO_SUCCESS
    photos: PhotosType
}
export const setPhotoSuccess = (photos: PhotosType): SetPhotoSuccessCreatorType => {
    return { type: SET_PHOTO_SUCCESS, photos }
}

// Thank createros

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data))
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(setPhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    }
    else {
        dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }))
        return Promise.reject(response.data.messages[0])
    }
}



export default profilePageReducer;
