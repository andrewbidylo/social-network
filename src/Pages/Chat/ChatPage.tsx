import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatMessageAPIType } from '../../API/chat-api'
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chatReducer'
import { AppStateType } from '../../redux/redaxStore'


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
    },[])
    


    return <div>    
        {status === 'error' && <div> Error. Please refresh the page</div>}
        <>
        <Messages/>
        <AddMessageForm/>
        </>
    
    </div>
}


const Messages: React.FC <{}>= ({}) => {
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
        
    },[messages])
    return <div style= {{height:'600px', overflow:'auto'}} onScroll={scrollHeandler}>
        {messages.map((m, index)=> <Message key = {index} message = {m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
}




const AddMessageForm: React.FC <{}>= ({})=> {
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

    return <>
         <div>
         Messages
         </div>
         <div> 
        <textarea onChange={(e)=> setMessage(e.currentTarget.value)} value={message}/>
    </div>
    <div>
        <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
    </div>
    </>
}
const Message: React.FC<{message: ChatMessageAPIType}> = React.memo( ({message}) => {

    //Button is disabled before channel will setup
    return <div>
        <b>{message.userName}</b>
        <div><img src={message.photo}  alt ={''} style={{height: '60px'}}/></div>
        <br/>
        {message.message}
        <hr/>
    </div>
})


type ChatPagePropsType = {
}


export default ChatPage