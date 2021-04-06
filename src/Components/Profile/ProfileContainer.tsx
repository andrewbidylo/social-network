import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { getUserProfile, updateStatus, getStatus, savePhoto, saveProfile } from '../../redux/profilePageReducer'
import { withAuthRedirect } from '../Hoc/withAuthRedirect'
import { compose } from 'redux'
import { AppStateType } from '../../redux/redaxStore'
import { ProfileType } from '../../types/types'



type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    getUserProfile: (userId: number | null)=> void
    updateStatus:(status: string)=> void
    getStatus:(userId: number | null)=> void
    savePhoto:(file: File)=> void
    saveProfile:(profile: ProfileType)=> Promise <any>
}

type PathParamsType = {
    userId: string
}

type PropsType =  MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component <PropsType> {
    refreshProfile = () => {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                savePhoto={this.props.savePhoto}
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                 />
        )
    }
}



let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,

})

export default compose <React.ComponentType>(
    connect(mapStateToProps, { getUserProfile, updateStatus, getStatus, savePhoto, saveProfile }),
    withRouter,
    withAuthRedirect)(ProfileContainer)
