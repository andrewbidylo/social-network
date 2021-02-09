import sidebarReducer from "./sidebarReducer"
import messagesPageReducer from "./messagesPageReducer"
import profilePageReducer from "./profilePageReducer"


let store = {
    _callSubscriber() {
        console.log('state is changed')
    },
    _state: {
        profilePage: {
            postData: [
                { id: '1', message: 'Hi, how are you?', likesCount: 10 },
                { id: '2', message: 'What are you doing?', likesCount: 2 },
                { id: '3', message: 'Lol', likesCount: 3 },
                { id: '3', message: 'Lol', likesCount: 3 },
                { id: '3', message: 'Lol', likesCount: 3 },
            ],
            newPostText: ''
        },
        messagesPage: {
            dialogData: [
                { id: '1', name: 'Andrew' },
                { id: '2', name: 'Irene' },
                { id: '3', name: 'Kriss' },
                { id: '4', name: 'Jon' },
                { id: '5', name: 'Megan' },

            ],
            messagesData: [
                { id: '1', message: 'Hi' },
                { id: '2', message: 'Hi. How are you doing?' },
                { id: '3', message: 'No' },
                { id: '4', message: "I can't" },
                { id: '5', message: 'lol' },
            ],
            newMessageBody: ''

        },
        sidebar: {
            PopularFriends: [
                { id: '1', name: 'Andrew' },
                { id: '2', name: 'Irene' },
                { id: '3', name: 'Kriss' },
            ]

        },


    },
    getState() {
        return this._state
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },


    dispatch(action) {
        this._state.profilePage = profilePageReducer(this._state.profilePage, action);
        this._state.messagesPage = messagesPageReducer(this._state.messagesPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state)
    },

}




export default store;