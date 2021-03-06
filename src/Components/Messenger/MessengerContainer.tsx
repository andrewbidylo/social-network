import Messenger from './Messenger'
import { actions } from '../../redux/messagesPageReducer'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../Hoc/withAuthRedirect'
import { compose } from 'redux'
import { AppStateType } from '../../redux/redaxStore'


let mapStateToProps = (state: AppStateType) => {
    return {
        messagesPage: state.messagesPage,
    }
}

export default compose <React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthRedirect
)(Messenger)
