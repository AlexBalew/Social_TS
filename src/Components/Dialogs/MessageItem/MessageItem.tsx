import React from 'react';
import classes from './MessageItem.module.css'
import {MessageType} from "../../redux/state";

const MessageItem = (props: MessageType) => {
    return <div className={classes.message}>
        {props.message}
    </div>
}


export default MessageItem;
