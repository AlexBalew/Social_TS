import {DialogsPageType, sendNewDialogMessageAC} from "../../redux/Reducers/dialogs-reducer"
import Dialogs from './Dialogs';
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {APPStateType} from "../../redux/redux-store";
import React from "react";
import {withAuthRedirectComponent} from "../../hoc/withAuthRedirectComponent";

export type mapDispatchToPropsType = {
    sendMessage: (newDialogMessage: string) => void
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
        sendMessage: (newDialogMessage) => {
            dispatch(sendNewDialogMessageAC(newDialogMessage))
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
