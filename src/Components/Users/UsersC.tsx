import React from "react";
import {UserType} from "../redux/Reducers/users-reducer";
import s from './Users.module.css'
import axios from "axios";
import userPhoto from './../../files/images/user-default.png'


type UsersPropsType = {
    users: Array<UserType>
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
    follow: (userID: number) => void
    pageSize: number
    totalUsersAmount: number
    currentPage: number
    setCurrentPage: (currentPage: number) => void
    setTotalUsersAmount: (totalAmount: number) => void
}

class Users extends React.Component<UsersPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersAmount(this.props.totalUsersAmount)
            });
    }

    onPageNumberChange = (p: number) => {
        this.props.setCurrentPage(p)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            });
    }

    render() {

        let amountOfPages = Math.ceil(this.props.totalUsersAmount / this.props.pageSize
        )
        let pages = []
        for (let i = 1; i <= amountOfPages; i++) {
            pages.push(i)
        }


        return (
            <div>
                <div>
                    {pages.map(p => <span key={p} className={this.props.currentPage === p ? s.selected : ''}
                                          onClick={(e) => {
                                              this.onPageNumberChange(p)
                                          }}>{p}</span>)}
                </div>
                {
                    this.props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={s.photo}
                                 alt='Users avatar'/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    this.props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    this.props.follow(u.id)
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
}


export default Users