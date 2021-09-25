import {DialogsPageType, sendMessageBodyAC, updateNewMessageBodyAC} from "../redux/Reducers/dialogs-reducer"
import Dialogs from './Dialogs';
import {connect} from "react-redux";
import {RootStateType} from "../../index";
import { Dispatch } from "redux";

export type mapDispatchToPropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessageBody: () => void
}

export type mapStateToPropsType = {
    dialogsPage: DialogsPageType
}

export type DialogsPropsType = mapStateToPropsType | mapDispatchToPropsType


let mapStateToProps = (state: RootStateType): mapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
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
