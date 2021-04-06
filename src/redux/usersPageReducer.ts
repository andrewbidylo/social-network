import { Dispatch } from 'react'
import { ApiResponseType } from '../API/api'
import { usersAPI } from '../API/users-api'
import { UsersType } from '../types/types'
import { updateUsersInArray } from '../utils/objectHelper'
import { BaseThunkType, InferActionsTypes } from './redaxStore'


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 8,
    totalCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, // array of users IDs
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

export type InitialStateType = typeof initialState
export type FilterFormType = typeof initialState.filter


export const usersPageReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
        case 'SET_FILTER':
            return { ...state, filter: action.payload }

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
    setFilter: (filter: FilterFormType) => ({ type: 'SET_FILTER', payload: filter } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const),
}

// Action creators


export const getUsers = (currentPage: number, pageSize: number, filter: FilterFormType): BaseThunkType<ActionsTypes> => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.setFilter(filter))

        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)

        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}

// Thank creators


export const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number,
    apiMethod: (userId: number) => Promise<ApiResponseType>, actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId))
    let response = await apiMethod(userId)

    if (response.resultCode === 0) { dispatch(actionCreator(userId)) }
    dispatch(actions.toggleFollowingInProgress(false, userId))
}

export const follow = (userId: number): BaseThunkType<ActionsTypes> => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (userId: number): BaseThunkType<ActionsTypes> => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    }
}


export default usersPageReducer;
