import UsersApiComponent from './UsersApiComponent'
import { connect } from 'react-redux'
import { follow, unfollow, getUsers } from '../../redux/usersPageReducer'
import { getUsersList, getPageSize, getTotalUserCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/usersSelectors'
import { AppStateType } from '../../redux/redaxStore'
import {MapStateToPropsType, MapDispatchToPropsType, OwnProps} from './UsersApiComponent'

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsersList(state),
        pageSize: getPageSize(state),
        totalCount: getTotalUserCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


let UsersConteiner = connect <MapStateToPropsType, MapDispatchToPropsType, OwnProps, AppStateType> (mapStateToProps, {
    follow, 
    unfollow,
    getUsers
})(UsersApiComponent)

export default UsersConteiner;