import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import MessageItem from './MessageItem/MessageItem'
import {v1} from 'uuid';
import {DialogsPageType} from "../../redux/Reducers/dialogs-reducer";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import { TextArea } from '../common/formComtrols/formControls';
import {required} from "../../utils/validators/required";
import { maxLengthCreator } from '../../utils/validators/maxLegth';

export type DialogsPagePropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: (newMessageBody: string) => void
    dialogsPage: DialogsPageType
    isAuth: boolean
}

type DialogFormDataType = {
    newDialogMessage: string
}

const Dialogs = (props: DialogsPagePropsType) => {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem key={v1()} name={d.name} id={d.id}/>)
    let messagesElements = props.dialogsPage.messages.map(m => <MessageItem key={v1()} message={m.message} id={m.id}/>)

    const addNewMessage = (formData: DialogFormDataType) => {
        props.sendMessage(formData.newDialogMessage)
    }

    return (
        <div className={classes.Dialogs}>
            <div className={classes.DialogsItems + '' + classes.active}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
                <div>
                    <AddMessageFormRedux onSubmit={addNewMessage}/>
                </div>
            </div>
        </div>)
}

export default Dialogs;

const maxLength = maxLengthCreator(10)

export const DialogsForm: React.FC<InjectedFormProps<DialogFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'insert your message'}
                       name={'newDialogMessage'} component={TextArea}
                       validate={[required, maxLength]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<DialogFormDataType>({
    form: 'dialogAddMessageForm'
})(DialogsForm)