import { getAuthUserData } from './auth'
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

export type InitialStateType = {
    inishialized: boolean

}

let initialState: InitialStateType = {
    inishialized: false,

}


const appReducer = (state = initialState, action: any): InitialStateType => {


    switch (action.type) {

        case INITIALIZED_SUCCESS:
            return { ...state, inishialized: true }

        default:
            return state
    }
}

type InishializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

// Action creator
export const inishializedSuccess = (): InishializedSuccessActionType => {
    return { type: INITIALIZED_SUCCESS }
}

// Thank creators //
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(inishializedSuccess())
        })

}

export default appReducer;
