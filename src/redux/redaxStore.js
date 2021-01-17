import { combineReducers, createStore } from "redux"
import messagesPageReducer from "./messagesPageReducer"
import profilePageReducer from "./profilePageReducer"
import sidebarReducer from "./sidebarReducer"
import usersPageReducer from "./usersPageReducer"


let reducers = combineReducers ({
    profilePage: profilePageReducer,
    usersPage: usersPageReducer,
    messagesPage: messagesPageReducer,
    sidbar: sidebarReducer,
})

let store = createStore (reducers)

export default store