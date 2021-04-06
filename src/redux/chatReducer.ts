import { Dispatch } from 'redux'
import { FormAction} from 'redux-form'
import { ChatAPI, ChatMessageAPIType } from '../API/chat-api'
import { BaseThunkType, InferActionsTypes } from './redaxStore'
import {StatusType} from './../API/chat-api'
import {v1} from 'uuid'


type ChatMessageType = ChatMessageAPIType & {id: string}
let initialState = {
messages: [] as ChatMessageType [],
status: 'panding' as StatusType
}
export type InitialStateType = typeof initialState


// Reducer
const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SN/CHAT/MESSAGES_RECEIVED':
            return { ...state, 
                messages: [...state.messages, ...action.payload.messages.map(m=>({...m, id: v1() }))]
                .filter((m, index, array) => index >= array.length - 100)
            }
            case 'SN/CHAT/STATUS_CHANGED':
                return { ...state, 
                    status: action.payload.status
                }

        default:
            return state
    }
}

type ActionsType = InferActionsTypes<typeof actions>

// Action creators / Retern actions
const actions = {
    messagesReceived: (messages: ChatMessageAPIType []) => ({
        type: 'SN/CHAT/MESSAGES_RECEIVED', payload: { messages}
    } as const),
    statusChanged: (status: StatusType ) => ({
        type: 'SN/CHAT/STATUS_CHANGED', payload: { status}
    } as const),
}

type ThunkType = BaseThunkType<ActionsType | FormAction>

let _newMessageHandler: ((messages: ChatMessageAPIType[])=> void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => { 
    if (_newMessageHandler === null){
    _newMessageHandler = (messages: ChatMessageAPIType[])=> {
        dispatch(actions.messagesReceived(messages))
    }
}

    return _newMessageHandler
    
}

let _statusChangedHandler: ((status: StatusType)=> void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => { 
    if (_statusChangedHandler === null){
        _statusChangedHandler = (status: StatusType)=> {
        dispatch(actions.statusChanged(status))
    }
}

    return _statusChangedHandler
    
}
// Thank creators // Return Thanks
export const startMessagesListening = (): ThunkType => async (dispatch) => {
    ChatAPI.start()
    ChatAPI.subscribeOnNewMessages("messages-received", newMessageHandlerCreator(dispatch))
    ChatAPI.subscribeOnNewMessages('status-changed', statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    ChatAPI.unsubscribeFromNewMessages("messages-received", newMessageHandlerCreator(dispatch))
    ChatAPI.unsubscribeFromNewMessages('status-changed',statusChangedHandlerCreator(dispatch))
    ChatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    ChatAPI.sendMessage(message)
}

export default chatReducer;
