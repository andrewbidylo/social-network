import React from 'react'
import { ProfileType } from '../../types/types'
import MyPostsConteiner from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'


type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status : string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
const Profile:React.FC <ProfilePropsType>=(props) => {
    
    return (<div>
        <ProfileInfo saveProfile = {props.saveProfile} savePhoto = {props.savePhoto} 
        isOwner = {props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
        <div>
            <MyPostsConteiner />
        </div>
    </div>
    )
};

export default Profile;