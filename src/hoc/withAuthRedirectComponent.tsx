import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {APPStateType} from "../redux/redux-store";

type mapStateToPropsType = {
    isAuth: boolean
}

let mapStateToPropsRedirect = (state: APPStateType): mapStateToPropsType => ({
    isAuth: state.authSetting.isAuth
})

export function withAuthRedirectComponent<T>(Component: ComponentType<T>) {
    function RedirectComponent(props: mapStateToPropsType) {

        let {isAuth, ...restProps} = props

        if (!props.isAuth) return <Redirect to='/login'/>
        return <Component {...restProps as T}/>
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}