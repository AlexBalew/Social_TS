import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import MessageItem from './MessageItem/MessageItem'
import {v1} from 'uuid';
import {DialogsPageType} from "../../redux/Reducers/dialogs-reducer";
import {Redirect} from "react-router-dom";

export type DialogsPagePropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessageBody: () => void
    dialogsPage: DialogsPageType
    isAuth: boolean
}

const Dialogs = (props: DialogsPagePropsType) => {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem key={v1()} name={d.name} id={d.id}/>)
    let messagesElements = props.dialogsPage.messages.map(m => <MessageItem key={v1()} message={m.message} id={m.id}/>)
    let newMessageBody = props.dialogsPage.newMessageBody

    let onClickSendMessage = () => {
        props.sendMessageBody()
    }
    let onChangeNewMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value
        props.updateNewMessageBody(body)
    }

    return (
        <div className={classes.Dialogs}>
            <div className={classes.DialogsItems + '' + classes.active}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div>
                        <textarea value={newMessageBody}
                                   onChange={onChangeNewMessage}
                                   placeholder='insert your message' />
                    </div>
                    <div>
                        <button onClick={onClickSendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>)
}

export default Dialogs;
