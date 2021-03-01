import React from "react"
import { reduxForm } from "redux-form"
import {CreateField, Input, Textarea} from "../../Common/FormsControl/FormsControl"
import classes from './ProfileInfo.module.css'
import styles from '../../Common/FormsControl/FormsControl.module.css'

let ProfileDataForm = ({profile, handleSubmit, error}) => {
    
    return <form onSubmit={handleSubmit}>
    
        <div><button>Save</button></div>
        {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
        <div>
            <b>Full name:</b>
            {CreateField('Full name', 'fullName', [], Input)}
        </div>
        <div>
            <b>Looking for a job:</b>
             {CreateField ('', 'lookingForAJob',[], Input, {type: 'checkbox'})}
        </div>
        
            <div>
                <b> My professional skills:</b>
                {CreateField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
            </div>
      
        <div>
            <b> About me:</b>
            {CreateField('About me', 'aboutMe', [], Textarea)}
        </div>
        <div>
            <b> Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <div key={key} className= {classes.contact}>
                <b>{key} : {CreateField(key, 'contacts.'+ key, [], Input)}</b>
                </div>
            })}
        </div>

    </form>

}

// HOC
const ProfileDataFormReduxForm = reduxForm({
    // a unique name for the form
    form: 'editProfile'
})(ProfileDataForm)

export default ProfileDataFormReduxForm