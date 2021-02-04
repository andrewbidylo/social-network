import React from "react"
// import { Redirect } from "react-router-dom";
import Preloader from "../../Common/Preloader/Preloader";
import classes from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'

const ProfileInfo = (props) => {

    // if(props.isAuth === false) return <Redirect to = {'/login'}/>
    if (!props.profile) {
        return <Preloader/>
    }
    // noPhoto = (props) => {if (props.profile.photos.large === null) {
    //     <img src = '/logo192.png' alt="logo"/>
    // }}
    return (<div>
        {/* <img src = '/logo192.png' alt="logo"/> */}
        <div className = {classes.descriptionBlock}>
          <img  src = {props.profile.photos.large} alt = 'alt'/>
          <ProfileStatus status = {props.status} updateStatus = {props.updateStatus}/>
        </div> 
        </div>
    )};

    export default ProfileInfo;