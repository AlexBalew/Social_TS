import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css';
import {Nullable} from "../../types";

type PropsType = {
    isAuth: boolean
    login: Nullable<string>
    logOutTC: () => void
}

const Header = (props: PropsType) => {
    return (
        <header className={s.header}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png'
                 alt={'logo'}/>
            <div className={s.authBlock}>
                {props.isAuth ? <div>{props.login}
                        <button onClick={props.logOutTC}>Log out</button>
                    </div> :
                    <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;
