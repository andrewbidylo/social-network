import React from "react"
import classes from './Post.module.css'


type OwnPropsType = {
    message: string
    likesCount: number
}

const Post: React.FC <OwnPropsType> = (props) => {
    return (
        <div>
            <div className={classes.item}>
                <img src='./logo192.png' alt="logo" />
                {props.message}
                <div></div><span>Like</span> {props.likesCount}

            </div>
        </div>
    )
};

export default Post;