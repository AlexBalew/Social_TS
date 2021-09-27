import s from "../Users/Users.module.css";
import Preloader3 from "../../files/images/Preloader3.gif";
import React from "react";

const Preloader = () => {
    return (
        <img className={s.preloader} src={Preloader3} alt={'preloader'}/>
    )
}

export default Preloader