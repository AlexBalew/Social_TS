import React from 'react';
import { v1 } from 'uuid';
import { FriendType } from '../../redux/Reducers/friendsBar-reducer';
import {Friend} from "./Friend";
import s from './Friends.module.css'
import {Store} from "redux";
import {AllACType, APPStateType} from "../../redux/redux-store";

export type FriendsPropsType = {
    store: Store<APPStateType, AllACType>
}

const Friends = (props: FriendsPropsType) =>{

    let state = props.store.getState()

    const FriendsList = state.friendsBar.friends.map((f: FriendType) => <Friend key={v1()} id={f.id} name={f.name} avatar={f.avatar} />)

    return (

        <div className={s.friendsContainer}>
            {FriendsList}
        </div>
    )
}
export default Friends;
