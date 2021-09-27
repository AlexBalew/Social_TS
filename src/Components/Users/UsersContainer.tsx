import {connect} from "react-redux";
import Users from "./UsersC";
import {RootStateType} from "../../index";
import {Dispatch} from "redux";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersAmountAC,
    setUsersAC,
    unfollowAC,
    UserType
} from "../redux/Reducers/users-reducer";

type mapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersAmount: number
    currentPage: number
}

type mapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersAmount: (totalAmount: number) => void
}

let mapStateToProps = (state: RootStateType): mapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersAmount: state.usersPage.totalUsersAmount,
        currentPage: state.usersPage.currentPage,
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)