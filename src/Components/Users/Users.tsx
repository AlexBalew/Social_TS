import React from "react";
import {FilterFormType, UserType} from "../../redux/Reducers/users-reducer";
import s from './Users.module.css'
import userPhoto from './../../files/images/user-default.png'
import {NavLink} from "react-router-dom";
import {UsersSearchForm} from "./UsersSearchForm";


type UsersPropsType = {
    users: Array<UserType>
    unfollow: (userID: number) => void
    follow: (userID: number) => void
    totalUsersAmount: number
    pageSize: number
    currentPage: number
    onPageNumberChange: (p: number) => void
    followedUsersIdAC: (id: number, isFetching: boolean) => void
    followedUsersId: number[]
    isFetching: boolean
    followUserTC: (userId: number, isFetching: boolean) => void
    unFollowUserTC: (userId: number, isFetching: boolean) => void
    onFilterChanged: (filter: FilterFormType) => void
}

let Users = (props: UsersPropsType) => {

    let amountOfPages = Math.ceil(props.totalUsersAmount / props.pageSize)
    let pages = []
    for (let i = 1; i <= amountOfPages; i++) {
        pages.push(i)
    }

    return (
        <div>

            <UsersSearchForm onFilterChanged={props.onFilterChanged} />

            <div style={{color: 'red'}}>
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
                                ? <button disabled={props.followedUsersId.some(id => id === u.id)} onClick={() => {
                                    props.unFollowUserTC(u.id, true)}}>Unfollow</button>
                                : <button disabled={props.followedUsersId.some(id => id === u.id)} onClick={() => {
                                    props.followUserTC(u.id, true)
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