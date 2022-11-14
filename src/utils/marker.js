import L from 'leaflet';
import person from './person-solid.svg';
// import loc from './location-dot-solid.svg';
import '../css/map.css';

export function createPersonMarker() {
    return new L.icon({
        iconUrl: person,
        iconRetinaUrl: person,
        iconAnchor: null,
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(30, 30)
    })
}

export function createLocationMarker(iconURL) {
    return new L.icon({
        iconUrl: iconURL,
        iconRetinaUrl: iconURL,
        iconAnchor: null,
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(25, 25)
    })
}

export function getCenter(friends) {
    let markerLayer = new L.FeatureGroup();
    friends.forEach((f) => {
        markerLayer.addLayer(L.marker(f.location.coordinate))
    });
    const center = markerLayer.getBounds().getCenter();
    return [center.lat, center.lng];
}

export function getFriendsMarkerBound(friends) {
    let markerLayer = new L.FeatureGroup();
    friends.forEach((f) => {
        markerLayer.addLayer(L.marker(f.location.coordinate))
    });
    return markerLayer.getBounds();
}