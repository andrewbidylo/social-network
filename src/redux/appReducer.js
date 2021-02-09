import { getAuthUserData } from '../redux/auth'
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'


let initialState = {
    inishialized: false,

}


const appReducer = (state = initialState, action) => {


    switch (action.type) {

        case INITIALIZED_SUCCESS:
            return { ...state, inishialized: true }

        default:
            return state
    }
}

// Action creator
export const inishializedSuccess = () => {
    return { type: INITIALIZED_SUCCESS }
}

// Thank creators //
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(inishializedSuccess())
        })

}

export default appReducer;
