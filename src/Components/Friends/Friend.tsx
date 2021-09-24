import React from 'react';
import {FriendType} from "../redux/Reducers/friendsBar-reducer"
import s from './Friends.module.css'

export function Friend(props: FriendType) {
    return (
        <div className={s.friendContainer}>
            <img className={s.friendContainer} src={props.avatar} alt='avatar'/>
            <div>
                {props.name}
            </div>
        </div>
    )
}