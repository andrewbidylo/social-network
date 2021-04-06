import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux"
import messagesPageReducer from "./messagesPageReducer"
import profilePageReducer from "./profilePageReducer"
import sidebarReducer from "./sidebarReducer"
import usersPageReducer from "./usersPageReducer"
import authReducer from "./auth"
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import appReducer from "./appReducer"
import { ThunkAction } from 'redux-thunk'
import chatReducer from "./chatReducer"

let rootReducer = combineReducers({
    profilePage: profilePageReducer,
    usersPage: usersPageReducer,
    messagesPage: messagesPageReducer,
    sidbar: sidebarReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer,
    

})

export type BaseThunkType < A extends Action, R = Promise <void>> = ThunkAction <R, AppStateType, unknown, A>

type PropertiesTypes <T> = T extends {[key: string]: infer U } ? U : never
export type InferActionsTypes <T extends { [key: string]: (...args: any[]) => any }> = ReturnType <PropertiesTypes<T>>


type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
// @ts-ignore
window._store_ = store



export default store