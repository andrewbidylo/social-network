import classes from './../Messenger.module.css'

type MessageType ={
    message: string
}
const Message: React.FC <MessageType> = (props) => {
    return (
        <div className={classes.messege}>
            {props.message}
        </div>
    )
}

export default Message;