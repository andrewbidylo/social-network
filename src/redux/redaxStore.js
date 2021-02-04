import { applyMiddleware, combineReducers, createStore } from "redux"
import messagesPageReducer from "./messagesPageReducer"
import profilePageReducer from "./profilePageReducer"
import sidebarReducer from "./sidebarReducer"
import usersPageReducer from "./usersPageReducer"
import authReducer from "./auth"
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from 'redux-form'
import appReducer from "./appReducer"

let reducers = combineReducers ({
    profilePage: profilePageReducer,
    usersPage: usersPageReducer,
    messagesPage: messagesPageReducer,
    sidbar: sidebarReducer,
    auth: authReducer,
    form: formReducer,
    app : appReducer
})

let store = createStore (reducers, applyMiddleware(thunkMiddleware))

export default store