import L from 'leaflet';
import InactiveMarker from '../assets/map-marker-inactive.svg';
import ActiveMarker from '../assets/map-marker-active.svg';

export const activeMarkerIcon = L.icon({
	iconUrl: InactiveMarker,
	iconSize: [30, 40],
	iconAnchor: [15, 40],
	popupAnchor: [0, -40],
});

export const inactiveMarkerIcon = L.icon({
	iconUrl: ActiveMarker,
	iconSize: [30, 40],
	iconAnchor: [15, 40],
	popupAnchor: [0, -40],
});