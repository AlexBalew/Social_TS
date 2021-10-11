import {DialogsPageType, sendMessageBodyAC, updateNewMessageBodyAC} from "../redux/Reducers/dialogs-reducer"
import Dialogs from './Dialogs';
import {connect} from "react-redux";
import { Dispatch } from "redux";
import {MainReducerType} from "../redux/redux-store";

export type mapDispatchToPropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessageBody: () => void
}

export type mapStateToPropsType = {
    dialogsPage: DialogsPageType
    isAuth: boolean
}


let mapStateToProps = (state: MainReducerType): mapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.authSetting.isAuth
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyAC(body))},
        sendMessageBody: () => {
            dispatch(sendMessageBodyAC())}
    }
}

const DialogsCompWithConnectFunc = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsCompWithConnectFunc;
