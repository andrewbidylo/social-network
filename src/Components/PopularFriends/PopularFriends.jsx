import React from 'react'
import classes from './PopularFriends.module.css'




const PopularFriends = (props) => {
    let FriendsElements = props.friendsData.map (d => <friendsData name = {d.name} id = {d.id}/>)
    return (
        <div className ={classes.dialogs}>
            <div className = {classes.dialogsItems}>
                {FriendsElements}
            </div>
        </div>


    )

}

export default PopularFriends;