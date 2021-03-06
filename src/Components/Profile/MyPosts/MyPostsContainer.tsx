import { connect } from "react-redux";
import { actions } from '../../../redux/profilePageReducer'
import { AppStateType } from "../../../redux/redaxStore";
import MyPosts from './MyPosts'
import {MapPropsType, DispatchPropsType} from './MyPosts'

let mapStateToProps = (state: AppStateType) => {
    return {
        postData: state.profilePage.postData,
        newPostText: state.profilePage.newPostText

    }
}


let MyPostsConteiner = connect <MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps,
     {addPost: actions.addPostActionCreator
})(MyPosts)

export default MyPostsConteiner;