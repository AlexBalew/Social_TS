import {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './ProfileInfo.module.css'

type ProfileStatusPropsType = {
    status: string
    updateUserStatusTC: (status: string) => void
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
            setEditMode(false)
            props.updateUserStatusTC(status)
        }
    }

    const setEditModeOnClick = () => {
        setEditMode(true)
    }

    const setViewMode = () => {
        setEditMode(false)
    }

    return (
        <div className={s.status}>
            {editMode ?
                <input value={status}
                       onChange={setStatusOnChangeHandler}
                       onBlur={setViewMode}
                       onKeyPress={onKeyPressStatusHandler}
                       autoFocus/>
                :
                <span onDoubleClick={setEditModeOnClick}>{status ? status : props.status}</span>
            }
            {!status && !props.status && <span onDoubleClick={setEditModeOnClick}>double click me</span>}
        </div>
    )

}

export default ProfileStatus