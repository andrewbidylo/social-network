import Messenger from './Messenger'
import { sendMessageCreator} from '../../redux/messagesPageReducer'
import { connect } from 'react-redux'
import {withAuthRedirect} from './../Hoc/withAuthRedirect'
import { compose } from 'redux'


let mapStateToProps = (state) => {
return {
    messagesPage: state.messagesPage,


}
}

let mapDispatchToProps = (dispatch) => {
    return {

        sendMessage: (newMassageBody) =>  
        {dispatch (sendMessageCreator(newMassageBody))}
    }
    }

export default compose (
    connect (mapStateToProps, mapDispatchToProps),
    withAuthRedirect
    )(Messenger)
