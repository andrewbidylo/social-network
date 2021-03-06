import { isNonNullChain } from "typescript"
import profilePageReducer,{ actions } from "./../redux/profilePageReducer"

let state = {
    postData: [
        { id: 1, message: 'Hi, how are you?', likesCount: 10 },
        { id: 2, message: 'What are you doing?', likesCount: 2 },
        { id: 3, message: 'Lol', likesCount: 3 },
        { id: 3, message: 'Lol', likesCount: 3 },
        { id: 3, message: 'Lol', likesCount: 3 },
    ],
    profile: null,
    status: '',
    newPostText: ''
}


it('lenght of post should be incremented', () => {
    // 1.test data
    let action = actions.addPostActionCreator('Andrew')

    // 2.action
    let newState = profilePageReducer(state, action)

    // 3.expectation
    expect(newState.postData.length).toBe(6)

})


it('message of new post should be correct', () => {
    // 1.test data
    let action = actions.addPostActionCreator('What are you doing?')

    // 2.action
    let newState = profilePageReducer(state, action)

    // 3.expectation
    expect(newState.postData[1].message).toBe('What are you doing?')

})

it('after deliting lenght of message should be decrement', () => {
    // 1.test data
    let action = actions.deletePost(1)

    // 2.action
    let newState = profilePageReducer(state, action)

    // 3.expectation
    expect(newState.postData.length).toBe(4)

})

it("after deliting lenght should't be decrement if ID is't correct", () => {
    // 1.test data
    let action = actions.deletePost(11111)

    // 2.action
    let newState = profilePageReducer(state, action)

    // 3.expectation
    expect(newState.postData.length).toBe(5)

})