import React from 'react';
import FriendRecord from './friendRecord';
import '../css/friendlist.css';
import { Container } from 'react-bootstrap';

const FriendsList = props => {
    const { friends } = props;
    return (<>
        <Container className='friend-list-container'>
            {friends.map((friend, i) => (<FriendRecord friend={friend} key={i}></FriendRecord>))}
        </Container>
    </>);
}

export default FriendsList;