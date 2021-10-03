import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css';
import {Nullable} from "../../types";
import {AuthUserType} from "../redux/Reducers/auth-reducer";

type PropsType = {
    isAuth: boolean
    login: Nullable<string>
    setUserDataAC: (data: AuthUserType) => void
}

const Header = (props: PropsType) => {
    return (
        <header className={s.header}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png'
                 alt={'logo'}/>
            <div className={s.authBlock}>
                {props.isAuth ? props.login :
                <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;
