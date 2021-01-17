import React from "react"
import Preloader from "../../Common/Preloader/Preloader";
import classes from './ProfileInfo.module.css'

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (<div>
        <img src = '/logo192.png' alt="logo"/>
        <div className = {classes.descriptionBlock}>
          <img  src = {props.profile.photos.large} alt = 'alt'/>
        </div> 
        </div>
    )};

    export default ProfileInfo;