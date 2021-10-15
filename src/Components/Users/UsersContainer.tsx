import {connect} from "react-redux";
import {RootStateType} from "../../index";
import {
    followAC, followedUsersIdAC, getUsersTC,
    setCurrentPage,
    unFollowAC,
    followUserTC,
    unFollowUserTC,
    UserType
} from "../../redux/Reducers/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../Preloader/Preloader";
import {withAuthRedirectComponent} from "../../hoc/withAuthRedirectComponent";
import {compose} from "redux";

type mapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersAmount: number
    currentPage: number
    isFetching: boolean
    followedUsersId: number[]
}

export type UsersPropsType = {
    users: Array<UserType>
    unfollow: (userID: number) => void
    follow: (userID: number) => void
    pageSize: number
    totalUsersAmount: number
    currentPage: number
    setCurrentPage: (currentPage: number) => void
    isFetching: boolean
    followedUsersIdAC: (id: number, isFetching: boolean) => void
    followedUsersId: number[]
    getUsersTC: (currentPage: any, pageSize: any) => void
    followUserTC: (userId: number, isFetching: boolean) => void
    unFollowUserTC: (userId: number, isFetching: boolean) => void
}

class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize)
    }

    onPageNumberChange = (p: number) => {
        this.props.setCurrentPage(p)
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize)
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : ''}
            <Users totalUsersAmount={this.props.totalUsersAmount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   users={this.props.users}
                   onPageNumberChange={this.onPageNumberChange}
                   followedUsersIdAC={this.props.followedUsersIdAC}
                   followedUsersId={this.props.followedUsersId}
                   isFetching={this.props.isFetching}
                   followUserTC={this.props.followUserTC}
                   unFollowUserTC={this.props.unFollowUserTC}

            />
        </>
    }
}

let mapStateToProps = (state: RootStateType): mapStateToPropsType => {

    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersAmount: state.usersPage.totalUsersAmount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followedUsersId: state.usersPage.followedUsersId,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow: followAC,
        unfollow: unFollowAC,
        setCurrentPage,
        followedUsersIdAC,
        getUsersTC,
        followUserTC,
        unFollowUserTC
    }),
    withAuthRedirectComponent
)(UsersContainer)

/*
let withRedirect = withAuthRedirectComponent(UsersContainer)

export default connect(mapStateToProps, {
    follow: followAC,
    unfollow: unFollowAC,
    setCurrentPage,
    followedUsersIdAC,
    getUsersTC,
    followUserTC,
    unFollowUserTC
})(withRedirect)*/
