import React from 'react';
import '../css/friendlist.css';
import { Avatar, Tooltip } from '@mui/material';
import { Button } from 'react-bootstrap';

const FriendRecord = props => {
    const {friend, onDelete} = props;
    return (<>
        <div className='friend-record'>
            <Tooltip title={friend.name} placement='left'>
                <Avatar style={{backgroundColor: friend.avatarColor}}>{friend.name.substring(0, 1)}</Avatar>
            </Tooltip>
            <strong className='ms-3'>{friend.location.address}</strong>
            <Button className='remove-friend-btn' onClick={() => onDelete(friend)}>
                <i className="bi bi-person-dash-fill"></i>
            </Button>
        </div>
    </>);
}

export default FriendRecord;