import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, useMap, Tooltip } from 'react-leaflet';
import { Button } from 'react-bootstrap';
import AddFriendModal from './components/addFriendModal';
import SearchResults from './components/searchResult';
import NotifToast from './components/toasts';
import {createPersonMarker, createLocationMarker, getCenter, getFriendsMarkerBound} from './utils/map_utils.js';
import './css/map.css';

function FocusFriends(props) {
  const map = useMap();
  const { friends, needFocus } = props;
  if (friends.length > 1 && needFocus) {
    map.fitBounds(getFriendsMarkerBound(friends));
  }
  return null;
}

function FocusPlace(props) {
  const map = useMap();
  const { place } = props;
  if (place) {
    map.flyTo(place.coordinate, map.getZoom());
  }
  return null;
}

class Map extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showAddFriend: false,
      friends: [],
      needFocusFriend: true,
      searchResults: [],
      showMoreResults: false,
      showToast: false,
      toastMsg: '',
      focusPlace: null
    };
    this.map = null;

  }

  toggleShowAdd = (showAddFriend) => {
    this.setState({showAddFriend});
  }

  handleAddFriend = friends => {
    this.setState({
      showAddFriend: false,
      needFocusFriend: true,
      friends
    });
  }
  
  handleDeleteFriend = friend => {
    this.setState({
      friends: this.state.friends.filter((f) => f.name !== friend.name)
    })
  }

  handleClickPlace = focusPlace => {
    this.setState({focusPlace, needFocusFriend: false});
  }

  getMorePlace = () => {
    // this.setState({showMoreResults: true});
  }

  hangout = () => {
    this.getPlaces(true);
  }

  getPlaces = () => {
    const centerCoor = getCenter(this.state.friends);
    var poi = new window.google.maps.LatLng(centerCoor[0], centerCoor[1]);

    this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: poi
    });
    var request = {
        location: poi,
        radius: 3218, 
        openNow: true,
        type: ['bar'] 
        // TODO: place category
        // ['art_gallery', 'bakery', 'bar', 'beauty_salon', 'bowling_alley', 'cafe', 'campground',
        //     'casino', 'clothing_store', 'gym', 'lodging', 'movie_rental', 'movie_theater', 'museum', 'night_club',
        //     'park', 'restaurant', 'shopping_mall', 'spa', 'stadium', 'store', 'supermarket', 'tourist_attraction', 'zoo']

    };
    var service = new window.google.maps.places.PlacesService(this.map);
    let formatted = [];
    // let showMore = this.state
    service.nearbySearch(request, (results, status, pagination) => {

        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            // console.log(results);
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
            // if (this.state.showMoreResults && pagination && pagination.hasNextPage) {
            //   pagination.nextPage();
            // }

        } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          this.setState({
            showToast: true, 
            toastMsg: 'Hmm, no good places found... Try move closer', 
            searchResults: []
          });
          setTimeout(() => {this.setState({showToast: false})}, 2000);
        }
    });
  }

  setShowToast = canShow => {
    this.setState({showToast: canShow});
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
        <Marker key={i} icon={createLocationMarker(place.icon)} position={place.coordinate}>
          <Tooltip>{place.name}</Tooltip>
        </Marker>
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
            attribution='
            &copy; <a href="https://www.maptiler.com/copyright">MapTiler</a>
            &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}@2x.png?key=8R29rXR7q29M4WdrS40C"
          />
          <FocusFriends friends={this.state.friends} needFocus={this.state.needFocusFriend}/>
          <FocusPlace place={this.state.focusPlace}></FocusPlace>
          { this.state.friends.length > 0 && this.renderMarker()}
          { this.state.searchResults.length > 0 && this.renderSearchResultMarker() }
        </MapContainer>
        { this.state.searchResults.length > 0 && 
          <SearchResults searchResults={this.state.searchResults} onClickPlace={this.handleClickPlace} toBottom={this.getMorePlace}></SearchResults>
        }
        <NotifToast msg={this.state.toastMsg} canShow={this.state.showToast} setShow={this.setShowToast}/>
      </>
    );
  }
}
export default Map;