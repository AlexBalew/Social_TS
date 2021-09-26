import {connect} from "react-redux";
import Users from "./Users";
import {RootStateType} from "../../index";
import {Dispatch} from "redux";
import {followAC, setUsersAC, unfollowAC, UserType} from "../redux/Reducers/users-reducer";

export type mapStateToPropsType = {
    users: Array<UserType>
}

export type mapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
}

let mapStateToProps = (state: RootStateType): mapStateToPropsType => {
    return {
        users: state.usersPage.users
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)