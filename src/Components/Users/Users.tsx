import React from 'react'
import { UsersType } from '../../types/types'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'


type PropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalCount: number
    pageSize: number
    users: Array <UsersType>
    followingInProgress: Array <number>
    unfollow: (userId:number) => void
    follow: (userId:number) => void
}
let Users: React.FC <PropsType> = ({currentPage, onPageChanged,totalCount, pageSize, users, followingInProgress, unfollow, follow}) => {
    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
            totalItemsCount={totalCount} pageSize={pageSize} />
        <div>
            {
                users.map(u => <User user={u} key={u.id}
                    followingInProgress={followingInProgress}
                    unfollow={unfollow}
                    follow={follow}
                />)}
        </div>
    </div>
}

export default Users