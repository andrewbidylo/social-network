import React from 'react'
import classes from './../Messenger.module.css'


const Message = (props) => {
    return (
        <div className={classes.messege}>
            {props.message}
        </div>
    )
}

export default Message;