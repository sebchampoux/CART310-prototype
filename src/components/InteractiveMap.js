import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { activeMarkerIcon, inactiveMarkerIcon } from '../utils/MarkerIcons';

export default class InteractiveMap extends Component {
	render() {
		const { highlightFct, locations } = this.props;

		const locationsMarkers = locations.map(l => {
			const eventHandlers = {
				mouseover() {
					highlightFct(l, true);
				},
				mouseout() {
					highlightFct(l, false);
				},
			};
			return (
				<Marker
					key={l.uid}
					position={l.position}
					eventHandlers={eventHandlers}
					icon={l.highlighted ? activeMarkerIcon : inactiveMarkerIcon}
					>
					<Popup className="map-location">
						<h1 className="map-location__title">{l.title}</h1>
						<div className="map-location__description">
							{l.location}
						</div>
					</Popup>
				</Marker>
			);
		});

		return (
			<MapContainer center={[42.5, -78]} zoom={6.5} scrollWheelZoom>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{locationsMarkers}
			</MapContainer>
		)
	}
}
