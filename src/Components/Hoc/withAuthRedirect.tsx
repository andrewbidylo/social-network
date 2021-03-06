import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redaxStore'

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
type MapPropsType = {
    isAuth: boolean
}

type MapDispatchType = {}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC <MapPropsType & MapDispatchType> = (props) => {
        let { isAuth, ...restProps } = props
        if (!props.isAuth) return <Redirect to={'/login'} />
        return <WrappedComponent {...restProps as unknown as WCP} />

    }


    let ConnectedAuthRedirectComponent = connect<MapPropsType, MapDispatchType, WCP, AppStateType>
        (mapStateToPropsForRedirect )
        (RedirectComponent)

    return ConnectedAuthRedirectComponent
} 
