import React from 'react'
import Paginator from './../Common/Paginator/Paginator'
import User from './User'

let Users = (props) => {
    return <div>
        <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
            totalCount={props.totalCount} pageSize={props.pageSize} />
        <div>
            {
                props.users.map(u => <User user={u} key={u.id}
                    followingInProgress={props.followingInProgress}
                    unfollow={props.unfollow}
                    follow={props.follow}
                />)}
        </div>
    </div>
}

export default Users