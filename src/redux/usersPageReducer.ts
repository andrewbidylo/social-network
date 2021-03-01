import { Dispatch } from 'react'
import { ThunkAction } from 'redux-thunk'
import { usersAPI } from '../API/users-api'
import { UsersType } from '../types/types'
import { updateUsersInArray } from '../utils/objectHelper'
import { AppStateType, InferActionsTypes } from './redaxStore'


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalCount: 5,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of users IDs
}

type InitialStateType = typeof initialState


const usersPageReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateUsersInArray(state.users, action.userId, 'id', { followed: true })
            }

        case 'UNFOLLOW':
            return {
                ...state,
                users: updateUsersInArray(state.users, action.userId, 'id', { followed: false })
            }
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage }

        case 'SET_USERS':
            return { ...state, users: action.users }

        case 'SET_TOTAL_COUNT':
            return { ...state, totalCount: action.totalCount }

        case 'TOGGLE_IS_FETCHING':
            return { ...state, isFetching: action.isFetching }

        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state
    }
}
type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<UsersType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (totalCount: number) => ({ type: 'SET_TOTAL_COUNT', totalCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const),
}

// Action creators


type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUsers = (currentPage: number, pageSize: number): ThunkActionType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(currentPage))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}

// Thank creators


const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: any, actionCreator: (userId: number)=> ActionsTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId))
    let response = await apiMethod(userId)

    if (response.data.resultCode === 0) { dispatch(actionCreator(userId)) }
    dispatch(actions.toggleFollowingInProgress(false, userId))
}

export const follow = (userId: number): ThunkActionType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow, actions.followSuccess)
    }
}

export const unfollow = (userId: number): ThunkActionType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow, actions.unfollowSuccess)
    }
}


export default usersPageReducer;
