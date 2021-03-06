import React from "react"
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import classes from './MyPosts.module.css'
import Post from './Post/Post'
import { required, maxLenghtCreator } from '../../../utils/validators/validators'
import { CreateField, Textarea } from '../../Common/FormsControl/FormsControl'
import { PostDataType } from "../../../types/types";

export type AddPostFormValueType = {
    newPostText: string

}

type AddPostFormKeysType = Extract <keyof AddPostFormValueType, string>


export type MapPropsType = {
    postData: Array <PostDataType>

}
export type DispatchPropsType = {
    addPost: (newPostText: string)=> void

}
const MyPosts: React.FC<MapPropsType & DispatchPropsType > = props => {
    let postsElements =
        [...props.postData]
            .reverse()
            .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />)


    let addPost = (values: AddPostFormValueType) => {
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

type AddNewFormOwnPropsType = {

}

const maxLenght10 = maxLenghtCreator(10)
const AddNewForm: React.FC <InjectedFormProps <AddPostFormValueType, AddNewFormOwnPropsType> & AddNewFormOwnPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
             {CreateField <AddPostFormKeysType>('Enter your message','newPostText',[required, maxLenght10],Textarea) }

            <div>
                <button>Add post</button>
            </div>
        </form>

    )
}

// Redux Form
const AddNewPostFormRedux = reduxForm <AddPostFormValueType, AddNewFormOwnPropsType>({
    // a unique name for the form
    form: 'profileAddNewPostForm'
})(AddNewForm)


export default MyPosts;