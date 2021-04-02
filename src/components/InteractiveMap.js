import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default class InteractiveMap extends Component {
	render() {
		const locations = this.props.locations.map(l => {
			return (
				<Marker key={l.position.toString()} position={l.position}>
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
				{locations}
			</MapContainer>
		)
	}
}
