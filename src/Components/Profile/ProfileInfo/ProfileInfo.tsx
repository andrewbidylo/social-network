import React, { ChangeEvent, useState } from "react"
import Preloader from "../../Common/Preloader/Preloader";
import classes from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import photoDefault from './../../../accets/imeges/userDefault.png'
import ProfileDataForm from './ProfileDataForm'
import { ContactsType, ProfileType } from "../../../types/types";
import { makeStyles } from '@material-ui/core/styles'
import { Button } from "@material-ui/core";

export type PropsTypeProfile  = {
    profile: ProfileType | null
    status: string
    updateStatus: (status : string) => void
    isOwner: boolean
    savePhoto: (files:File) => void
    saveProfile: (formData: ProfileType) => Promise<any>
}
const UseStyle = makeStyles ({
    helloThereStyle: {
    background: '#FE6B8B',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 24,
    padding: '0 10px',
    boxShadow: '',
    }
})



const ProfileInfo: React.FC <PropsTypeProfile> = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
   


    //HOOK for editing profile info
    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader />
    }

    const onProfilePhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
       saveProfile(formData).then (()=>{
        setEditMode (false)
       }
       )
    }
    
    return (<div>
        <div className={classes.descriptionBlock}>
            <img src={profile.photos.large || photoDefault} className={classes.avatarDef} alt='alt' />
            <div>{isOwner && <input  type={'file'} onChange={onProfilePhotoSelected} />}</div>
            {editMode
                ? <ProfileDataForm initialValues = {profile} profile={profile} onSubmit={onSubmit}/>
                : <ProfileData goToEditMode ={() => {setEditMode(true)}} isOwner={isOwner} profile={profile} />}
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
    </div>
    )

}
type ContactPorpsType = {
    contactTitle: string
    contactValue: string
}

let Contact: React.FC <ContactPorpsType> = ({ contactTitle, contactValue }) => {
    return <div className={classes.contacts}><b>{contactTitle}</b>: {contactValue}</div>
}

type ProfileDataPorpsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: ()=> void

}
let ProfileData:React.FC <ProfileDataPorpsType> = ({ profile, isOwner, goToEditMode }) => {

    const classesbbb:any = UseStyle()
    return <div>
       {isOwner && <div>
           <Button className={classesbbb.helloThereStyle} onClick = {goToEditMode}>Edit</Button></div>}
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
            <b> Contacts:</b> {Object.keys(profile.contacts).map((key) => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
            })}
        </div>

    </div>

}



export default ProfileInfo;