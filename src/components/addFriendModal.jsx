import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SearchAddress from './searchAddress';
import '../css/modal.css';
import { Container } from 'react-bootstrap';


class AddFriendModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      friends: null,
      newName: '',
      newAddress: null
    };
    
  }

  handleSelectAddress = (loc) => {
    this.setState({
      newAddress: {
        lng: loc.lng,
        lat: loc.lat
      }
    });
  }
  
  handleInputName = (name) => {
    this.setState({newName: name});
  }

  handleAddSingleFriend = () => {
    
  }

  render() {
    const { onHide } = this.props;
    return (
      <Modal centered {...this.props} size='lg'>
        <Modal.Body>
          <h4 className='header'>Add New Friends</h4>
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