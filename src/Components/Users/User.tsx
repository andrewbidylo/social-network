import React from 'react'
import styles from './Users.module.css'
import photoDefault from './../../../src/accets/imeges/userDefault.png'
import { NavLink } from 'react-router-dom'
import { UsersType } from '../../types/types'

type PropsType = {
    user: UsersType
    followingInProgress: Array <number> 
    follow:(userId : number) => void
    unfollow:(userId : number) => void
}

let Users: React.FC <PropsType> = ({ user, followingInProgress, follow, unfollow }) => {
    return (
        <div>
            <span>
                <div>
                    {user.name}
                </div>
                <div >
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : photoDefault} className={styles.userPhoto} alt='userPhoto' />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id)
                        }}
                        > Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id)
                        }}
                        > Follow</button>
                    }
                </div>
            </span>
            <span>
                <div></div>
                <div></div>
            </span>
            <span>

                <div>
                    {user.status}
                </div>
            </span>
            <span>
            </span>

        </div>
    )
}





export default Users