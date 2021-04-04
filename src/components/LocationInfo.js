import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'

export default class LocationInfo extends Component {
	render() {
		const { location, deleteLocationFct, addLocationFct, highlightFct } = this.props;
		const highlightClass = location.highlighted ? 'location-info__highlighted' : '';
		return (
			<div
				className={"location-info " + highlightClass}
				onMouseOver={() => highlightFct && highlightFct(location, true)}
				onMouseOut={() => highlightFct && highlightFct(location, false)}
				>
				<div className="location-info__text-wrapper">
					<h1 className="location-info__title">{location.title}</h1>
					<p className="location-info__location">{location.location}</p>
				</div>
				<div className="location-info__btns-wrapper">
					{addLocationFct && 
						<button
						className="btn btn-success location-info__delete-btn"
						onClick={addLocationFct}
						>
							<FontAwesomeIcon icon="plus-circle" />
						</button>
					}
					{deleteLocationFct && 
						<button
						className="btn btn-danger location-info__delete-btn"
						onClick={deleteLocationFct}
						>
							<FontAwesomeIcon icon="times" />
						</button>
					}
				</div>
			</div>
		)
	}
}
