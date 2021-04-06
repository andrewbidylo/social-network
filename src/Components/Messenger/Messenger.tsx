import React from 'react'
import classes from './Messenger.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { required, maxLenghtCreator } from '../../utils/validators/validators'
import { CreateField, Textarea } from '../Common/FormsControl/FormsControl'
import { InitialStateType } from '../../redux/messagesPageReducer'

type PropsType = {
    messagesPage: InitialStateType
    sendMessage: (messageText:string) => void
}

type NewMassegerValuesFormType = {
    newMessageBody: string

}

type AddMessageFormKeysType = Extract <keyof NewMassegerValuesFormType, string>

const Messenger: React.FC< PropsType> = (props) => {

    let state = props.messagesPage

    let MassagesElements = state.messagesData.map(m => <Message message={m.message} />)


    let addNewMessage = (values: NewMassegerValuesFormType) => {
        props.sendMessage(values.newMessageBody)
    }

    return (
        <div className={classes.dialogs}>


            <div className={classes.messeges}>
                <div>
                    {MassagesElements}
                </div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage} />
        </div>


    )

}

// Validation paramerters
const maxLenght50 = maxLenghtCreator(50)

// Data collection and submit to the handleSubmit

type AddMessageFormOwnProps = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMassegerValuesFormType, AddMessageFormOwnProps> & AddMessageFormOwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
            <div>
                </div>
                {CreateField <AddMessageFormKeysType>('Enter your message','newMessageBody',[required, maxLenght50],Textarea) }
            </div>
            <div>
                <button >Send</button>
            </div>
        </form>
    )
}


// Redux Form
const AddMessageFormRedux = reduxForm <NewMassegerValuesFormType, AddMessageFormOwnProps>({
    // a unique name for the form
    form: 'dialogAddMessageForm'
})(AddMessageForm)

export default Messenger