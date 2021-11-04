import React from "react";
import {FilterFormType, UserType} from "../../redux/Reducers/users-reducer";
import {UsersSearchForm} from "./UsersSearchForm";
import Pagination from "../common/Pagination/Pagination";
import User from "./User";


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

    return <div>
        <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
        <Pagination totalItemsAmount={props.totalUsersAmount}
                    pageSize={props.pageSize}
                    currentPage={props.currentPage}
                    onPageNumberChange={props.onPageNumberChange}
                    numberOfPagesInOnePortion={8}
        />
        {
            props.users.map(u => <User key={u.id} user={u}
                                       followedUsersId={props.followedUsersId}
                                       followUserTC={props.followUserTC}
                                       unFollowUserTC={props.unFollowUserTC}
            />)
        }
    </div>
}
export default Users