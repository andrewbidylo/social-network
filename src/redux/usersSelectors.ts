import { AppStateType } from "./redaxStore"

export const getUsersList = (state: AppStateType) => {
   return state.usersPage.users
}
export const getPageSize = (state: AppStateType) => {
   return state.usersPage.pageSize
}

export const getTotalUserCount = (state: AppStateType) => {
   return state.usersPage.totalCount
}

export const getCurrentPage = (state: AppStateType) => {
   return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
   return state.usersPage.isFetching
}


export const getFollowingInProgress = (state: AppStateType) => {
   return state.usersPage.followingInProgress
}
export const getUsersFilter = (state: AppStateType) => {
   return state.usersPage.filter
   
}