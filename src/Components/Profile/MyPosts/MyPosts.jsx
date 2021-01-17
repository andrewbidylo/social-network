
import React from "react"
import classes from './MyPosts.module.css'
import Post from './Post/Post'



const MyPosts = (props) => {


    let newPostElement = React.createRef();

    let addPost = () => {
        props.addPost()

    }

    let onPostChange = ()=>{
        let text = newPostElement.current.value;
        props.updateNewPostText(text);

    } 

    let Posts = props.postData.map (p => <Post message = {p.message} likesCount= {p.likesCount}/>)

    return (
    <div className = {classes.PostsBlock}>
        <div>
        <h2>My posts </h2>
        </div>
        <textarea ref = {newPostElement} onChange = {onPostChange} value = {props.newPostText}></textarea>
        <div><button onClick = {addPost}>Add post</button></div>
        <div className = {classes.posts}>
            {Posts}
        </div>
    </div>
    )};

    export default MyPosts;