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
      newAddress: null
    };
    
  }

  handleSelectAddress = (coor, addr) => {
    this.setState({
      newAddress: {
        lng: coor.lng,
        lat: coor.lat,
        address: addr
      }
    });
  }

  handleInputName = (name) => {
    this.setState({newName: name});
  }

  handleAddSingleFriend = () => {
    const newFriend = {
      avatarColor: generateAvatarColor(),
      name: this.state.newName,
      location: this.state.newAddress
    }
    this.setState({friends: [...this.state.friends, newFriend]});
  }

  render() {
    const { onHide } = this.props;
    return (
      <Modal centered {...this.props} size='lg'>
        <Modal.Body>
          <h4 className='header'>My Friends</h4>
          {this.state.friends.length > 0 && <FriendsList friends={this.state.friends}/>}
          <Container className='input-container'>
            <input placeholder='Name' className='input-name' onChange={(e) => this.handleInputName(e.target.value)}></input>
            <SearchAddress onSelect={this.handleSelectAddress}></SearchAddress>
            <Button className='add-new-friend-btn' disabled={!this.state.newAddress || !this.state.newName} onClick={this.handleAddSingleFriend}>Add</Button>
          </Container>

        </Modal.Body>
        <Modal.Footer>
          <Button variant='success'>Add Friends</Button>
          <Button onClick={onHide} variant='secondary'>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
 
export default AddFriendModal;