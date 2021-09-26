import React from "react";
import {UserType} from "../redux/Reducers/users-reducer";
import s from './Users.module.css'


export type UsersPropsType = {
    users: Array<UserType>
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
    follow: (userID: number) => void
}

let Users = (props: UsersPropsType) => {
    return (
        <div>{
            props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photoURL} className={s.photo} alt={'User\'s avatar'}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    props.follow(u.id)
                                }}>Follow</button>}
                        </div>
                    </span>
                <span>
                    <div>{u.fullName}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{u.location.country}</div>
                    <div>{u.location.city}</div>
                </span>
            </div>)
        }
        </div>
    )
}

export default Users