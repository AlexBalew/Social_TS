import {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './ProfileInfo.module.css'

type ProfileStatusPropsType = {
    status: string
}

function ProfileStatus(props: ProfileStatusPropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>('')


    const setStatusOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newStatus = e.currentTarget.value
        setStatus(newStatus)
    }

    const onKeyPressStatusHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            let newStatus = e.currentTarget.value
            setStatus(newStatus)
            setEditMode(false)
        }
        return {status}
    }

    const setEditModeHandler = () => {
        setEditMode(true)
    }

    const setViewModeHandler = () => {
        setEditMode(false)
    }

    return (
        <div className={s.status}>
            {editMode ?
                <input value={status}
                       onChange={setStatusOnChangeHandler}
                       onBlur={setViewModeHandler}
                       onKeyPress={onKeyPressStatusHandler}
                       autoFocus/>
                :
                <span onDoubleClick={setEditModeHandler}>{status ? status : props.status}</span>
            }
        </div>
    )

}

export default ProfileStatus