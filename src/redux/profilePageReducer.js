const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'


let initialState = {
    postData: [
        {id:'1', message: 'Hi, how are you?', likesCount: 10},
         {id:'2', message: 'What are you doing?', likesCount: 2},
         {id:'3', message: 'Lol', likesCount: 3},
         {id:'3', message: 'Lol', likesCount: 3},
         {id:'3', message: 'Lol', likesCount: 3},
         ],
    newPostText: '',
    profile : null
}


const profilePageReducer = (state = initialState, action) => {
    

    switch (action.type){
    case ADD_POST:
    let newPost = { 
        id: 6,
        message: state.newPostText,
        likesCount: 7
        };
        return {...state, postData: [...state.postData, newPost],newPostText: ''}

    case UPDATE_NEW_POST_TEXT:
        return {...state, newPostText: action.newText}
    case SET_USER_PROFILE:
        return {...state, profile: action.profile}
    
    default:
        return state
    }
}

export const addPostActionCreator = () => {
    return { type: ADD_POST
    }
}

export const updateNewPostTextActionCreator = (text) => {
    return { type: UPDATE_NEW_POST_TEXT, newText: text
    }
}
export const setUserProfile = (profile) => {
    return { type: SET_USER_PROFILE, profile}
}

export default profilePageReducer;
