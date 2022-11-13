import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SearchAddress from './searchAddress';
import FriendsList from './friendsList';
import { generateAvatarColor } from '../utils/avatarColorGenerator';
import '../css/modal.css';
import { Container } from 'react-bootstrap';


class AddFriendModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      newName: '',
      newAddress: null,
      hasDuplicate: false,
    };
    
  }

  handleSelectAddress = (coor, addr) => {
    this.setState({
      newAddress: {
        coordinate: [coor.lat, coor.lng],
        address: addr
      }
    });
  }

  handleInputName = (name) => {
    this.setState({hasDuplicate: false});
    this.state.friends.forEach((friend) => {
      if (friend.name === name) {
        this.setState({hasDuplicate: true});
        return;
      }
    });
    this.setState({newName: name});
  }

  handleAddSingleFriend = () => {
    const newFriend = {
      avatarColor: generateAvatarColor(),
      name: this.state.newName,
      location: this.state.newAddress
    }
    this.setState({
      friends: [...this.state.friends, newFriend],
      hasDuplicate: true
    });
  }

  handleAddFriendsToMap = () => {
    this.props.onSubmit(this.state.friends);
  }

  handleDelete = (friend) => {
    this.setState({
      friends: this.state.friends.filter((f) => f.name !== friend.name),
      hasDuplicate: false
    });
    this.props.onDelete(friend);
  };

  handlerOnClose = () => {
    this.setState({newName: '', newAddress: null});
    this.props.onHide();
  }
  
  render() {
    const {show, onHide} = this.props;
    return (
      <Modal centered show={show} onHide={onHide} size='lg'>
        <Modal.Body>
          <h4 className='header'>Friends</h4>
          <Container className='input-container'>
            <input id='name-input' placeholder='Name' className='input-name' onChange={(e) => this.handleInputName(e.target.value)}></input>
            <SearchAddress onSelect={this.handleSelectAddress}></SearchAddress>
            <Button className='add-new-friend-btn' disabled={!this.state.newAddress || !this.state.newName || this.state.hasDuplicate} onClick={this.handleAddSingleFriend}>Add</Button>
          </Container>
          {this.state.friends.length > 0 && <FriendsList friends={this.state.friends} onDelete={this.handleDelete}/>}

        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={this.handleAddFriendsToMap}>Add</Button>
          <Button onClick={this.handlerOnClose} variant='secondary'>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
 
export default AddFriendModal;