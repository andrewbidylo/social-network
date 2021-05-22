import React from 'react'
import photoDefault from './../../../src/accets/imeges/userDefault.png'
import { NavLink } from 'react-router-dom'
import { UsersType } from '../../types/types'
import { Button } from "@material-ui/core";
import UseStyle from './UserStyle'
import classes from './Users.module.css'

type PropsType = {
    user: UsersType
    followingInProgress: Array <number> 
    follow:(userId : number) => void
    unfollow:(userId : number) => void
}

let Users: React.FC <PropsType> = ({ user, followingInProgress, follow, unfollow }) => {
    const classesMU:any = UseStyle()
    return (
        
        <div className={classes.userBlock}>
            <span>
                <div className={classes.userName}>
                    {user.name}
                </div>
                <div>
                    <NavLink  to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : photoDefault} className={classes.userPhoto} alt='userPhoto' />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <Button variant="contained" className = {classesMU.button}  disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id)
                        }}
                        > Unfollow</Button>
                        : <Button variant="contained" className = {classesMU.button}  disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id)
                        }}
                        > Follow</Button>
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