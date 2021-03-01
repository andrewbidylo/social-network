import React from 'react'
import MyPostsConteiner from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'


const Profile = (props) => {
    
    return (<div>
        <ProfileInfo saveProfile = {props.saveProfile} savePhoto = {props.savePhoto} isOwner = {props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
        <div>
            <MyPostsConteiner />
        </div>
    </div>
    )
};

export default Profile;