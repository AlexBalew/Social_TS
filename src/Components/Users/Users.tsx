import React from "react";
import {UserType} from "../redux/Reducers/users-reducer";
import s from './Users.module.css'
import userPhoto from './../../files/images/user-default.png'
import {NavLink} from "react-router-dom";
import {follow, unFollow} from "../../API/api";


type UsersPropsType = {
    users: Array<UserType>
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
    follow: (userID: number) => void
    totalUsersAmount: number
    pageSize: number
    currentPage: number
    onPageNumberChange: (p: number) => void
}

let Users = (props: UsersPropsType) => {

    let amountOfPages = Math.ceil(props.totalUsersAmount / props.pageSize
    )
    let pages = []
    for (let i = 1; i <= amountOfPages; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {pages.map(p => <span key={p} className={props.currentPage === p ? s.selected : s.notSelected}
                                      onClick={() => {
                                          props.onPageNumberChange(p)
                                      }}>{p} </span>)}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/Profile/' + u.id}>
                            <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={s.photo}
                                 alt='Users avatar'/>
                                </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                   unFollow(u.id)
                                        .then(data => {
                                            if(data.resultCode === 0) {
                                                props.unfollow(u.id)
                                            }
                                        });
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    follow(u.id)
                                        .then(data => {
                                            if(data.resultCode === 0) {
                                                props.follow(u.id)
                                            }
                                        });
                                }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </span>
                    <span>
                    <div>{'u.location.country'}</div>
                    <div>{'u.location.city'}</div>
                </span>
                </div>)
            }
        </div>
    )
}

export default Users