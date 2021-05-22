import React from "react"
import classes from './Header.module.css'
import { NavLink } from 'react-router-dom'
import { Button } from '@material-ui/core'
import UseStyle from '../../Components/Profile/ProfileInfo/ProfileStyle'

export type MapHeaderPropsType = {
    isAuth: boolean
    login: string | null
}
export type DispatchHeaderPropsType = {
    
    logout: () =>void
}
const Header: React.FC <MapHeaderPropsType & DispatchHeaderPropsType> = (props) => {
    const classesMU:any = UseStyle()
    return (<header className={classes.header}>
        <img src='/logo192.png' alt="logo" />

        <div className={classes.loginBlock}>
            {props.isAuth
                ? <div>{props.login} <Button variant="contained" className = {classesMU.button} onClick={props.logout}> Logout</Button></div>
                : <NavLink to={'/login'}> Login </NavLink>
            }
        </div>
    </header>
    )
};

export default Header;


