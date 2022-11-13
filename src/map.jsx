import React, { Component } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Button } from 'react-bootstrap';
import './css/map.css';
import AddFriendModal from './components/addFriendModal';

class Map extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showAddFriend: false
    };
  }

  toggleShowAdd = (showAddFriend) => {
    this.setState({showAddFriend});
  }

  render() { 
    return (
      <>
        <AddFriendModal show={this.state.showAddFriend} onHide={() => this.toggleShowAdd(false)}></AddFriendModal>
        <Button className='add-friend-btn' variant='success' onClick={() => this.toggleShowAdd(true)}>Add My Friends</Button>
        <MapContainer
          center={[37.229572, -80.413940]} 
          zoom={13}
          className='map-container'
          zoomControl={false}
          >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </>
    );
  }
}
export default Map;