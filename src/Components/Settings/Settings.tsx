import React, {ChangeEvent, useState} from "react";
import {putStatus} from "../../API/api";
import s from './Settings.module.css'

type SettingsPropsType = {

}

export const Settings = (props: SettingsPropsType) => {

    const [status, setStatus] = useState<string>('')

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newStatus = e.currentTarget.value
        setStatus(newStatus)
    }

    const onClickHandler = (status: string) => {
        putStatus(status).then(r => {
            console.log('Your status was updated')
        })
        setStatus('')
    }

    const onClickUpdatePhotoHandler = () => {
        /*profileAPI.updatePhoto().then(r => {
            console.log("Your avatar was updated with" + r.photos.small)
        })*/
    }


    return (
        <div className={s.set}>
            <h3>My profile settings</h3>
            <input value={status} onChange={onChangeStatusHandler}/>
            <button onClick={() => onClickHandler(status)}>put new status</button>
         <div>
            <button onClick={() => onClickUpdatePhotoHandler()}>set new photo</button>
         </div>
        </div>
    )
}