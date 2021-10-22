import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatMessageAPIType } from '../../API/chat-api'
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chatReducer'
import { AppStateType } from '../../redux/redaxStore'
import { Button } from "@material-ui/core";
import UseStyle from '../../Components/Profile/ProfileInfo/ProfileStyle'
import classes from './ChatPage.module.css'

const ChatPage: React.FC <ChatPagePropsType> = () => {
    return <div>
            <Chat />
            </div >
}

const Chat: React.FC =() => {
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)
    
    useEffect(()=>{
        dispatch(startMessagesListening())
        return ()=> {
            dispatch(stopMessagesListening())
        }
    },[dispatch])
    
    return <div>    
        {status === 'error' && <div> Error. Please refresh the page</div>}
        <>
        <Messages/>
        <AddMessageForm/>
        </>
    </div>
}

const Messages: React.FC <{}>= () => {
    const messages = useSelector ((state: AppStateType)=> state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState (false)
    const scrollHeandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight)<300){
            !isAutoScroll && setIsAutoScroll (true)
        } else {
            isAutoScroll && setIsAutoScroll (false)
        }
    }


    useEffect (()=>{
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior:'smooth'})
        }
        
    },[messages, isAutoScroll])
    return <div style= {{height:'600px', overflow:'auto'}} onScroll={scrollHeandler}>
        {messages.map((m, index)=> <Message key = {index} message = {m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
}




const AddMessageForm: React.FC <{}>= ()=> {
    // Messages sending
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    
    const status = useSelector((state:AppStateType) => state.chat.status)


    const sendMessageHandler = () =>{
        if (!message){
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }
    const classesMU:any = UseStyle()
    return <>
         <div>
         Messages
         </div>
         <div> 
        <textarea onChange={(e)=> setMessage(e.currentTarget.value)} value={message}/>
    </div>
    <div>
        {/* Button is disabled before channel will setup */}
        <Button variant="contained" className = {classesMU.button} disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>
    </div>
    </>
}
const Message: React.FC<{message: ChatMessageAPIType}> = React.memo( ({message}) => {


    return <div >
        <b className ={classes.userName}>{message.userName}</b>
        <div className ={classes.userName}><img src={message.photo}  alt ={''} style={{height: '60px'}}/></div>
        <br/>
        <div className ={classes.userName}>{message.message}</div>
        <hr/>
    </div>
})


type ChatPagePropsType = {
}


export default ChatPage