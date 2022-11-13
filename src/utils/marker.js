import L from 'leaflet';
import person from './person-solid.svg';

export function createMarker() {
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

export function getCenter(friends) {
    // let markerLayer = new L.FeatureGroup();
    let markers = friends.map((f) => [...f.location.coordinate]);
    console.log(markers);
}