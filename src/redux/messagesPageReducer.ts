import { InferActionsTypes } from "./redaxStore"


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

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>


const messagesPageReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        case ('SN/PR/SEND-MESSAGE'):

            let body = action.newMessageBody
            return {
                ...state,
                messagesData: [...state.messagesData, { id: 7, message: body }]
            }
        default:
            return state
    }
}



// Action creators
export const actions = {
    sendMessage: (newMessageBody: string) => ({ type: 'SN/PR/SEND-MESSAGE', newMessageBody } as const),
    updateNewMessageBodyCreator: (body: string) => ({ type: 'SN/PR/UPDATE-NEW-MESSAGE-BODY', body: body } as const)
}




export default messagesPageReducer;
