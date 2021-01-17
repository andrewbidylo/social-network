import Messenger from './Messenger'
import { sendMessageCreator,updateNewMessageBodyCreator } from '../../redux/messagesPageReducer'
import { connect } from 'react-redux'


let mapStateToProps = (state) => {
return {
    messagesPage: state.messagesPage

}
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageBody: (body) => 
        {dispatch(updateNewMessageBodyCreator(body))},

        sendMessage: () =>  
        {dispatch (sendMessageCreator())}
    }
    }

let MessengerConteiner = connect (mapStateToProps, mapDispatchToProps) (Messenger)

export default MessengerConteiner;