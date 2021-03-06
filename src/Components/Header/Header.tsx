import React, { ReactNode } from "react"
import classes from './Header.module.css'
import { NavLink } from 'react-router-dom'

export type MapHeaderPropsType = {
    isAuth: boolean
    login: string | null
}
export type DispatchHeaderPropsType = {
    
    logout: () =>void
}
const Header: React.FC <MapHeaderPropsType & DispatchHeaderPropsType> = (props) => {
    return (<header className={classes.header}>
        <img src='/logo192.png' alt="logo" />

        <div className={classes.loginBlock}>
            {props.isAuth
                ? <div>{props.login} <button onClick={props.logout}> Logout</button></div>
                : <NavLink to={'/login'}> Login </NavLink>
            }
        </div>

    </header>
    )
};

export default Header;