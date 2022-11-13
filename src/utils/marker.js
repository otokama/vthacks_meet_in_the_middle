import L from 'leaflet';
import person from './person-solid.svg';
import loc from './location-dot-solid.svg';

export function createPersonMarker() {
    return new L.icon({
        iconUrl: person,
        iconRetinaUrl: person,
        iconAnchor: null,
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(30, 45)
    })
}

export function createLocationMarker() {
    return new L.icon({
        iconUrl: loc,
        iconRetinaUrl: loc,
        iconAnchor: null,
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(30, 45)
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