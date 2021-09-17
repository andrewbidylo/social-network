import { FormAction, stopSubmit } from 'redux-form'
import { } from '../API/api'
import { profileAPI } from '../API/profile-api'
import { PhotosType, PostDataType, ProfileType } from '../types/types'
import { BaseThunkType, InferActionsTypes } from './redaxStore'


let initialState = {
    postData: [
        { id: 1, message: 'Hi, how are you?', likesCount: 10 },
        { id: 2, message: 'What are you doing?', likesCount: 2 },
        { id: 3, message: 'Lol', likesCount: 3 },

    ] as Array<PostDataType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const profilePageReducer = (state = initialState, action: ActionsType): InitialStateType => {


    switch (action.type) {
        case 'SN/PP/ADD-POST':
            let newPost = {
                id: 6,
                message: action.newPostText,
                likesCount: 7
            };
            return { ...state, postData: [...state.postData, newPost], newPostText: '' }

        case 'SN/PP/DELETE_POST':
            return { ...state, postData: state.postData.filter(p => p.id !== action.postId) }

        case 'SN/PP/SET_USER_PROFILE':
            return { ...state, profile: action.profile }
        case 'SN/PP/SET_STATUS':
            return { ...state, status: action.status }
        case 'SN/PP/SET_PHOTO_SUCCESS':
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }

        default:
            return state
    }
}

// Action creators

export const actions = {
    addPostActionCreator: (newPostText: string) => ({ type: 'SN/PP/ADD-POST', newPostText } as const),
    deletePost: (postId: number) => ({ type: 'SN/PP/DELETE_POST', postId } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'SN/PP/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SN/PP/SET_STATUS', status } as const),
    setPhotoSuccess: (photos: PhotosType) => ({ type: 'SN/PP/SET_PHOTO_SUCCESS', photos } as const)
}


// Thank creators

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.setPhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch: any, getState: any) => {
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
