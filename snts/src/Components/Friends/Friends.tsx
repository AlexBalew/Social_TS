import React from 'react';
import {SideBarType} from "../redux/state";


const Friends = (props: SideBarType) =>{

    return (
        <div>
            {props.friends}
        </div>
    )
}
export default Friends;
