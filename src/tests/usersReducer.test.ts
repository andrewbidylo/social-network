import {InitialStateType} from './../redux/usersPageReducer'
import {usersPageReducer, actions} from './../redux/usersPageReducer'


let State: InitialStateType
beforeEach (() => {
    State ={
    users: [
        {id:0, name: 'Andrew0', followed:false, 
        photos: {small:null, large:null}, status:'Status0'},
        {id:1, name: 'Andrew1', followed:false, 
        photos: {small:null, large:null}, status:'Status1'},
        {id:2, name: 'Andrew2', followed:true, 
        photos: {small:null, large:null}, status:'Status2'},
        {id:3, name: 'Andrew3', followed:true, 
        photos: {small:null, large:null}, status:'Status3'},
    ],
    pageSize: 5,
    totalCount: 5,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] ,
}
})

test ('unfollowSuccess', () => {

const NewState = usersPageReducer(State, actions.followSuccess(1) )

expect (NewState.users[0].followed).toBeFalsy()
expect (NewState.users[1].followed).toBeTruthy()
})

test ('unfollowSuccess', () => {

    const NewState = usersPageReducer(State, actions.unfollowSuccess(3) )
    
    expect (NewState.users[3].followed).toBeFalsy()
    expect (NewState.users[2].followed).toBeTruthy()
    
    })