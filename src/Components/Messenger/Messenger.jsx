import React from 'react'
import classes from './Messenger.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'



const Messenger = (props) => {

    let state = props.messagesPage

    let DialogElements = state.dialogData.map (d => <DialogItem name = {d.name} id = {d.id}/>)
    let MassagesElements = state.messagesData.map (m => <Message message= {m.message}/>)
    let newMessageBody = state.newMessageBody

    let onSendMessageClick = () => {
        props.sendMessage()
    }
    let onNewMessageChange = (event ) => {
        let body = event.target.value
        props.updateNewMessageBody(body)

    } 
    return (
        <div className ={classes.dialogs}>

            <div className = {classes.dialogsItems}>
                {DialogElements}
            </div>
            <div className = {classes.messeges}>
                <div>
                {MassagesElements}
                </div>
                <div>
                <textarea onChange = {onNewMessageChange} value = {newMessageBody} placeholder ='Enter your message'></textarea>
                </div>
                
        <div>
            <button onClick = {onSendMessageClick}>Send</button>
            </div>
            </div>
        </div>


    )

}

export default Messenger;