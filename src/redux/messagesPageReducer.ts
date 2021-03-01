const SEND_MESSAGE = 'SEND-MESSAGE'
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'

type DialogDataType = {
    id: number
    name: string

}
type MessagesDataType = {
    id: number
    message: string

}

let initialState = {
    dialogData: [
        { id: 1, name: 'Andrew' },
        { id: 2, name: 'Irene' },
        { id: 3, name: 'Kriss' },
        { id: 4, name: 'Jon' },
        { id: 5, name: 'Megan' },

    ] as Array<DialogDataType>,
    messagesData: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'Hi. How are you doing?' },
        { id: 3, message: 'No' },
        { id: 4, message: "I can't" },
        { id: 5, message: 'lol' },
    ] as Array<MessagesDataType>,

}

type InitialStateType = typeof initialState

const messagesPageReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {

        case (SEND_MESSAGE):

            let body = action.newMessageBody
            return {
                ...state,
                messagesData: [...state.messagesData, { id: 7, message: body }]
            }
        default:
            return state
    }
}


type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}



// Action creators

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => {
    return {
        type: SEND_MESSAGE, newMessageBody
    }
}

export const updateNewMessageBodyCreator = (body: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY, body: body
    }
}

export default messagesPageReducer;
