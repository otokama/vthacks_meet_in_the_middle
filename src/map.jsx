import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Button } from 'react-bootstrap';
import './css/map.css';
import AddFriendModal from './components/addFriendModal';
import {createMarker, getCenter} from './utils/marker';


class Map extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showAddFriend: false,
      markers: [],
      friends: []
    };
  }

  toggleShowAdd = (showAddFriend) => {
    this.setState({showAddFriend});
  }

  handleAddFriend = (friends) => {
    this.setState({
      showAddFriend: false,
      friends,
      markers: friends.map((f) => [...this.state.markers, f.location.coordinate])
    });
    getCenter(friends);
  }
  
  handleDeleteFriend = (friend) => {
    this.setState({
      friends: this.state.friends.filter((f) => f.name !== friend.name)
    })
  }

  
  renderMarker() {
    return (
      this.state.friends.map((friend, i) => 
        <Marker key={i} icon={createMarker()} position={friend.location.coordinate}></Marker>
      )
    );
  }

  render() { 
    return (
      <>
        <AddFriendModal onSubmit={this.handleAddFriend} onDelete={this.handleDeleteFriend}
          show={this.state.showAddFriend}
          onHide={() => this.toggleShowAdd(false)} 
          friends={this.state.friends}></AddFriendModal>
        <Button className='add-friend-btn' variant='success' onClick={() => this.toggleShowAdd(true)}>My Friends</Button>
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
          {this.renderMarker()}
        </MapContainer>
      </>
    );
  }
}
export default Map;