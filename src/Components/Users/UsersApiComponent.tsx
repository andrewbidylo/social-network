import React from 'react'
import Users from './Users'
import Preloader from '../Common/Preloader/Preloader'
import { UsersType } from '../../types/types'


export type MapDispatchToPropsType = {
    getUsers: (pageNumber: number, pageSize: number) => void 
    unfollow:  (userId:number) => void
    follow: (userId:number) => void
    
}


export type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalCount: number
    users: Array<UsersType>
    followingInProgress: Array <number>
}
export type OwnProps = {

}
type PropsType = MapDispatchToPropsType & MapStateToPropsType & OwnProps

class UsersApiComponent extends React.Component <PropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalCount={this.props.totalCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                followingInProgress={this.props.followingInProgress}
            /> </>
    }
}

export default UsersApiComponent