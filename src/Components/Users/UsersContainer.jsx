
import UsersApiComponent from './UsersApiComponent'
import { connect } from 'react-redux'
import {follow, unfollow, setCurrentPage, toggleFollowingInProgress,getUsers} from './../../redux/usersPageReducer'
import {getUsersList,getPageSize,getTotalUserCount,getCurrentPage,getIsFetching,getFollowingInProgress} from './../../redux/usersSelectors'
 
let mapStateToProps = (state) => {
return {
    users: getUsersList (state),
    pageSize: getPageSize(state),
    totalCount: getTotalUserCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
}
}


let UsersConteiner = connect (mapStateToProps, {toggleFollowingInProgress, follow, unfollow,
     setCurrentPage,
     getUsers} ) (UsersApiComponent)

export default UsersConteiner;