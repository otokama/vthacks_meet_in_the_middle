import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Button } from 'react-bootstrap';
import './css/map.css';
import AddFriendModal from './components/addFriendModal';
import {createPersonMarker, createLocationMarker, getCenter} from './utils/marker';
import SearchResults from './components/searchResult';

class Map extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showAddFriend: false,
      markers: [],
      friends: [],
      searchResults: []
    };
  }

  toggleShowAdd = (showAddFriend) => {
    this.setState({showAddFriend});
  }

  handleAddFriend = friends => {
    this.setState({
      showAddFriend: false,
      friends,
      markers: friends.map((f) => [...this.state.markers, f.location.coordinate])
    });
  }
  
  handleDeleteFriend = friend => {
    this.setState({
      friends: this.state.friends.filter((f) => f.name !== friend.name)
    })
  }

  hangout = () => {
    const centerCoor = getCenter(this.state.friends);
    var poi = new window.google.maps.LatLng(centerCoor[0], centerCoor[1]);

    var map = new window.google.maps.Map(document.getElementById('map'), {
        center: poi
    });
    var request = {
        location: poi,
        radius: '3218', 
        openNow: true,
        type: ['art_gallery', 'bakery', 'bar', 'beauty_salon', 'bowling_alley', 'cafe', 'campground',
            'casino', 'clothing_store', 'gym', 'lodging', 'movie_rental', 'movie_theater', 'museum', 'night_club',
            'park', 'restaurant', 'shopping_mall', 'spa', 'stadium', 'store', 'supermarket', 'tourist_attraction', 'zoo']

    };
    var service = new window.google.maps.places.PlacesService(map);
    let formatted = [];
    service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            results.forEach(result => {
                formatted.push({
                    place_id: result.place_id,
                    coordinate: [result.geometry.location.lat(), result.geometry.location.lng()],
                    icon: result.icon,
                    name: result.name,
                    rating: result.rating,
                    types: result.types,
                    address: result.vicinity
                })
            });
            this.setState({searchResults: formatted});
        }
    });
  }

  renderMarker() {
    return (
      this.state.friends.map((friend, i) => 
        <Marker key={i} icon={createPersonMarker()} position={friend.location.coordinate}></Marker>
      )
    );
  }

  renderSearchResultMarker() {
    
    return (
      this.state.searchResults.map((place, i) => 
        <Marker key={i} icon={createLocationMarker()} position={place.coordinate}></Marker>
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
        <Button className='hangout-btn' onClick={this.hangout} disabled={this.state.friends.length < 2}>Hangout!</Button>
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
          { this.state.friends.length > 0 && this.renderMarker()}
          { this.state.searchResults.length > 0 && this.renderSearchResultMarker() }
        </MapContainer>
        { this.state.searchResults.length > 0 && 
          <SearchResults searchResults={this.state.searchResults}></SearchResults>
        }
      </>
    );
  }
}
export default Map;