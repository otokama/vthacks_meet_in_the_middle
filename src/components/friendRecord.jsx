import React from 'react';
import '../css/friendlist.css';
import { Avatar, Tooltip } from '@mui/material';

const FriendRecord = props => {
    const {friend} = props;
    return (<>
        <div className='friend-record'>
            <Tooltip title={friend.name} placement='left'>
                <Avatar style={{backgroundColor: friend.avatarColor}}>{friend.name.substring(0, 1)}</Avatar>
            </Tooltip>
            <strong className='ms-3'>{friend.location.address}</strong>
        </div>
    </>);
}

export default FriendRecord;