import { getAuthUserData } from './auth'
import { InferActionsTypes } from './redaxStore'


type InitialStateType = typeof initialState

let initialState = {
    inishialized: false,
}

type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {


    switch (action.type) {

        case 'SN/APP/INITIALIZED_SUCCESS':
            return { ...state, inishialized: true }

        default:
            return state
    }
}


export const actions = {
    inishializedSuccess: () => ({ type: 'SN/APP/INITIALIZED_SUCCESS' } as const)
}
// Action creator


// Thank creators //
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(actions.inishializedSuccess())
        })

}

export default appReducer;
