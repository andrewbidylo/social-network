const SEND_MESSAGE = 'SEND-MESSAGE'
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'



let initialState = {
    dialogData: [  
        {id:'1', name: 'Andrew'},
        {id: '2', name: 'Irene'},
        {id: '3', name: 'Kriss'},
        {id: '4', name: 'Jon'},
        {id: '5', name: 'Megan'},
        
      ],
     messagesData: [  
        {id:'1', message: 'Hi'},
        {id: '2', message: 'Hi. How are you doing?'},
        {id: '3', message: 'No'},
        {id: '4', message: "I can't"},
        {id: '5', message: 'lol'},
      ],
    newMessageBody: ''
}

const messagesPageReducer = (state = initialState, action) => {

 
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
        return {
            ...state,
            newMessageBody: action.body
        }
    
        case (SEND_MESSAGE):
        
            let body = state.newMessageBody
            return {
                ...state,
                newMessageBody: '',
                messagesData: [...state.messagesData, {id: 7, message: body}]
            }
        default:
            return state    
}


}

export const sendMessageCreator = () => {
    return { type: SEND_MESSAGE
    }
}

export const updateNewMessageBodyCreator = (body) => {
    return { type: UPDATE_NEW_MESSAGE_BODY, body: body
    }
}

export default messagesPageReducer;
