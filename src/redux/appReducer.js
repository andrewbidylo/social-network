import { getAuthUserData } from '../redux/auth'
const INITIALIZED_SUCCSESS = 'INITIALIZED_SUCCSESS'


let initialState = {
        inishialized: false,

}


const appReducer = (state = initialState, action) => {
    

    switch (action.type){

    case INITIALIZED_SUCCSESS:
        return {...state, inishialized: true}
    
    default:
        return state
    }
}

// Action creator
export const inishializedSuccsess= () => {
    return { type: INITIALIZED_SUCCSESS}
}

// Thank creators //
export const initializeApp = () => (dispatch) => { 
    let promis = dispatch (getAuthUserData())
    Promise.all([promis])
    .then (() => {
        dispatch (inishializedSuccsess())
    })
    
}

export default appReducer;
