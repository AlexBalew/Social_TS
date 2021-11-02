import React from "react";
import {UserType} from "../../redux/Reducers/users-reducer";
import s from './Users.module.css'
import userPhoto from './../../files/images/user-default.png'
import {NavLink} from "react-router-dom";


type UserPropsType = {
    user: UserType
    followedUsersId: number[]
    followUserTC: (userId: number, isFetching: boolean) => void
    unFollowUserTC: (userId: number, isFetching: boolean) => void
}

let User = ({user, followedUsersId, unFollowUserTC, followUserTC, ...props}: UserPropsType) => {

    return (
        <div>
            <span>
                        <div>
                            <NavLink to={'/Profile/' + user.id}>
                            <img src={user.photos.small !== null ? user.photos.small : userPhoto} className={s.photo}
                                 alt='Users avatar'/>
                                </NavLink>
                        </div>
                        <div>
                            {user.followed
                                ? <button disabled={followedUsersId.some(id => id === user.id)} onClick={() => {
                                    unFollowUserTC(user.id, true)
                                }}>Unfollow</button>
                                : <button disabled={followedUsersId.some(id => id === user.id)} onClick={() => {
                                    followUserTC(user.id, true)
                                }}>Follow</button>}
                        </div>
            </span>
            <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
            <span>
                    <div>{'u.location.country'}</div>
                    <div>{'u.location.city'}</div>
                </span>
        </div>
    )
}

export default User