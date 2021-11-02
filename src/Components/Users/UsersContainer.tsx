import {connect} from "react-redux";
import {
    FilterFormType,
    followAC,
    followedUsersIdAC,
    followUserTC,
    getUsersTC,
    setCurrentPage,
    unFollowAC,
    unFollowUserTC,
    UserType
} from "../../redux/Reducers/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirectComponent} from "../../hoc/withAuthRedirectComponent";
import {compose} from "redux";
import {APPStateType} from "../../redux/redux-store";
import {
    getCurrentPage,
    getFilter,
    getFollowedUsersId,
    getIsFetching,
    getPageSize,
    getTotalUsersAmount,
    getUsersSuper
} from "../../redux/selectors/users.selectors";

type mapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersAmount: number
    currentPage: number
    isFetching: boolean
    followedUsersId: number[]
    filter: FilterFormType
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
    getUsersTC: (currentPage: number, pageSize: number, filter: FilterFormType) => void
    followUserTC: (userId: number, isFetching: boolean) => void
    unFollowUserTC: (userId: number, isFetching: boolean) => void
    filter: FilterFormType
}

class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        let {currentPage, pageSize, filter} = this.props
        this.props.getUsersTC(currentPage, pageSize, filter)
    }

    onPageNumberChange = (p: number) => {
        const {pageSize, filter, currentPage} = this.props
        this.props.setCurrentPage(p)
        this.props.getUsersTC(currentPage, pageSize, filter)
    }

    onFilterChanged = (filter: FilterFormType) => {
        const {pageSize} = this.props
        this.props.getUsersTC(1, pageSize, filter)
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
                   onFilterChanged={this.onFilterChanged}
            />
        </>
    }
}

let mapStateToProps = (state: APPStateType): mapStateToPropsType => {

    return {
        users: getUsersSuper(state),
        pageSize: getPageSize(state),
        totalUsersAmount: getTotalUsersAmount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followedUsersId: getFollowedUsersId(state),
        filter: getFilter(state)
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
