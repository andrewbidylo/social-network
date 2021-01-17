import React from 'react'
import * as axios from 'axios'
import Users from './Users'
import Preloader from './../Common/Preloader/Preloader'



class UsersApiComponent extends React.Component {
   
    componentDidMount() {
    this.props.toggleIsFetching(true)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage} & count = ${this.props.pageSize}`).then(response  => {
        this.props.toggleIsFetching(false)
        this.props.setUsers(response.data.items)
        this.props.setTotalUsersCount(response.data.totalCount)})

    }
    
    onPageChanged = (pageNumber) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        
        
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber} & count = ${this.props.pageSize}`).then(response  => {
            this.props.toggleIsFetching(false)    
            this.props.setUsers(response.data.items)})
    }

    render () {

        return <> 
        {this.props.isFetching ? <Preloader/> : null }
        <Users 
        totalCount = {this.props.totalCount}
        pageSize = {this.props.pageSize}
        currentPage = {this.props.currentPage}
        onPageChanged = {this.onPageChanged}
        users = {this.props.users}
        unfollow = {this.props.unfollow}
        follow = {this.props.follow}
        /> </>
        }}
    
export default UsersApiComponent