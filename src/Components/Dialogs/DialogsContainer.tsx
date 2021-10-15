import {DialogsPageType, sendMessageBodyAC, updateNewMessageBodyAC} from "../../redux/Reducers/dialogs-reducer"
import Dialogs from './Dialogs';
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {APPStateType} from "../../redux/redux-store";
import React from "react";
import {withAuthRedirectComponent} from "../../hoc/withAuthRedirectComponent";

export type mapDispatchToPropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessageBody: () => void
}

export type mapStateToPropsType = {
    dialogsPage: DialogsPageType
}


let mapStateToProps = (state: APPStateType): mapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyAC(body))
        },
        sendMessageBody: () => {
            dispatch(sendMessageBodyAC())
        }
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirectComponent
)(Dialogs)

/*let AuthRedirectComponent = withAuthRedirectComponent(Dialogs)

const DialogsCompWithConnectFunc = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

export default DialogsCompWithConnectFunc;*/
