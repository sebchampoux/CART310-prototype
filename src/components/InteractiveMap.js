import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

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
					key={l.position.toString()} position={l.position}
					eventHandlers={eventHandlers}
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
			<MapContainer center={[40, -80]} zoom={4} scrollWheelZoom>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{locationsMarkers}
			</MapContainer>
		)
	}
}
