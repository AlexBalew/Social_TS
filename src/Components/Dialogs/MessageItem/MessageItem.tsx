import React from 'react';
import { MessageType } from '../../../redux/Reducers/dialogs-reducer';
import classes from './MessageItem.module.css'


const MessageItem = (props: MessageType) => {
    return <div className={classes.message}>
        {props.message}
    </div>
}


export default MessageItem;
