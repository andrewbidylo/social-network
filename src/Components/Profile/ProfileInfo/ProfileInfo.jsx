import React, { useState } from "react"
import Preloader from "../../Common/Preloader/Preloader";
import classes from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import photoDefault from './../../../accets/imeges/userDefault.png'
import ProfileDataForm from './ProfileDataForm'

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {



    //HOOK for editing profile info
    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader />
    }

    const onProfilePhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
       saveProfile(formData).then (()=>{
        setEditMode (false)
       }
       )
    }
    
    return (<div>
        <div className={classes.descriptionBlock}>
            <img src={profile.photos.large || photoDefault} className={classes.avatarDef} alt='alt' />
            <div>{isOwner && <input type={'file'} onChange={onProfilePhotoSelected} />}</div>
            {editMode
                ? <ProfileDataForm initialValues = {profile} profile={profile} onSubmit={onSubmit}/>
                : <ProfileData goToEditMode ={() => {setEditMode(true)}} isOwner={isOwner} profile={profile} />}
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
    </div>
    )

}
let Contact = ({ contactTitle, contactValue }) => {
    return <div className={classes.contacts}><b>{contactTitle}</b>: {contactValue}</div>
}


let ProfileData = ({ profile, isOwner, goToEditMode }) => {
    return <div>
       {isOwner && <div><button onClick = {goToEditMode}>Edit</button></div>}
        <div>
            <b>Full name:</b> {profile.fullName}
        </div>
        <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? 'Yes' : 'No'}
        </div>
            <div>
                <b> My professional skills: </b>{profile.lookingForAJobDescription}
            </div>
        
        <div>
            <b> About me:</b> {profile.aboutMe}
        </div>
        <div>
            <b> Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}
        </div>

    </div>

}



export default ProfileInfo;