import React from 'react';
import {FriendsBarType} from "../redux/store";


const Friends = (props: FriendsBarType) =>{

    return (
        <div>
            {props.friends}
        </div>
    )
}
export default Friends;
