import React from 'react'
import classes from './../Messenger.module.css'
import { NavLink } from "react-router-dom";

type DialogItemPropsType = {
    id: number
    name: string
}

const DialogItem: React.FC <DialogItemPropsType> = (props) => {
    return (
        <div>

            <div className={classes.dialog + ' ' + classes.activ + ' ' + classes.item}>
                <NavLink to={'/Messenger/' + props.id}><img src='./logo192.png' alt="logo" />{props.name}</NavLink>
            </div>
        </div>
    )
}

export default DialogItem