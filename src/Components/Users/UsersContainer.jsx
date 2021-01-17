
import UsersApiComponent from './UsersApiComponent'
import { connect } from 'react-redux'
import {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching} from './../../redux/usersPageReducer'


 
let mapStateToProps = (state) => {
return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalCount: state.usersPage.totalCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching
    
    

}
}

let UsersConteiner = connect (mapStateToProps, {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching} ) (UsersApiComponent)

export default UsersConteiner;