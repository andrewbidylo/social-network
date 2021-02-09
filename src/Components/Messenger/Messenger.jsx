import React from 'react'
import classes from './Messenger.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { Field, reduxForm } from 'redux-form'
import { required, maxLenghtCreator } from './../../utils/validators/validators'
import { Textarea } from './../Common/FormsControl/FormsControl'



const Messenger = (props) => {

    let state = props.messagesPage

    let DialogElements = state.dialogData.map(d => <DialogItem name={d.name} id={d.id} />)
    let MassagesElements = state.messagesData.map(m => <Message message={m.message} />)


    let addNewMessage = (values) => {
        props.sendMessage(values.newMassageBody)
    }

    // if(!props.isAuth) return <Redirect to = {'/login'}/>

    return (
        <div className={classes.dialogs}>

            <div className={classes.dialogsItems}>
                {DialogElements}
            </div>
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

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Enter your message'} name={'newMassageBody'} component={Textarea} validate={[required, maxLenght50]} />
            </div>
            <div>
                <button >Send</button>
            </div>
        </form>
    )
}


// Redux Form
const AddMessageFormRedux = reduxForm({
    // a unique name for the form
    form: 'dialogAddMessageForm'
})(AddMessageForm)

export default Messenger;