import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { logout } from '../../redux/auth'
import { AppStateType } from '../../redux/redaxStore'
import {MapHeaderPropsType, DispatchHeaderPropsType} from './Header'



class HeaderContainer extends React.Component <MapHeaderPropsType & DispatchHeaderPropsType> {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect <MapHeaderPropsType, DispatchHeaderPropsType, {}, AppStateType>
(mapStateToProps,
     { logout })(HeaderContainer)