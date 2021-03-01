import React from "react"
import { Field, reduxForm } from "redux-form";
import classes from './MyPosts.module.css'
import Post from './Post/Post'
import { required, maxLenghtCreator } from './../../../utils/validators/validators'
import { Textarea } from './../../Common/FormsControl/FormsControl'
import { Button } from "@material-ui/core";


const MyPosts = (props) => {
    let postsElements =
        [...props.postData]
            .reverse()
            .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />)


    let addPost = (values) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={classes.PostsBlock}>
            <div>
                <h2>My posts</h2>
            </div>
            <AddNewPostFormRedux onSubmit={addPost} />
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
};

// Data collection and submit to the handleSubmit
const maxLenght10 = maxLenghtCreator(10)
const AddNewForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder={'Enter your message'} name={'newPostText'}
                component={Textarea} validate={[required, maxLenght10]} />
            <div>
                <button>Add post</button>
            </div>
        </form>

    )
}

// Redux Form
const AddNewPostFormRedux = reduxForm({
    // a unique name for the form
    form: 'profileAddNewPostForm'
})(AddNewForm)


export default MyPosts;