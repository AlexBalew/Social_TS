import {connect} from "react-redux";
import {RootStateType} from "../../index";
import {
    follow,
    setCurrentPage,
    setTotalUsersAmount,
    setUsers, switchPreloader,
    unfollow,
    UserType
} from "../redux/Reducers/users-reducer";
import React from "react";
import axios from "axios";
import Users from "./Users";
import Preloader from "../Preloader/Preloader";

type mapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersAmount: number
    currentPage: number
    isFetching: boolean
}

/*type mapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersAmount: (totalAmount: number) => void
    switchPreloader: (isFetching: boolean) => void
}*/

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
    isFetching: boolean
    switchPreloader: (isFetching: boolean) => void
}

class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.switchPreloader(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.switchPreloader(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersAmount(this.props.totalUsersAmount)
            });
    }

    onPageNumberChange = (p: number) => {
        this.props.setCurrentPage(p)
        this.props.switchPreloader(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.switchPreloader(false)
                this.props.setUsers(response.data.items)
            });
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : ''}
            <Users totalUsersAmount={this.props.totalUsersAmount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   users={this.props.users}
                   setUsers={this.props.setUsers}
                   onPageNumberChange={this.onPageNumberChange}
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
        isFetching: state.usersPage.isFetching
    }
}

/*let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        follow: (userID: number) => {
            dispatch(followAC(userID))
        },
        unfollow: (userID: number) => {
            dispatch(unfollowAC(userID))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPageAC(currentPage))
        },
        setTotalUsersAmount: (totalAmount: number) => {
            dispatch(setTotalUsersAmountAC(totalAmount))
        },
        switchPreloader: (isFetching: boolean) => {
            dispatch(switchPreloaderAC(isFetching))
        }
    }
}*/

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersAmount,
    switchPreloader
})(UsersContainer)