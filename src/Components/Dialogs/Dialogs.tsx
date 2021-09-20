import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import MessageItem from './MessageItem/MessageItem'
import {DialogsPageType} from "../redux/state";

const Dialogs = (props: DialogsPageType) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.messages.map(m => <MessageItem message={m.message} id={m.id}/>)

    return (
        <div className={classes.Dialogs}>
            <div className={classes.DialogsItems + '' + classes.active}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
            </div>
        </div>)
}

export default Dialogs;
