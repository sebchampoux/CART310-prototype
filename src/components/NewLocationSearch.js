import React, { Component } from 'react'
import MyPopUp from './MyPopUp';
import { SearchOSM } from '../utils/SearchOSM';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LocationInfo from './LocationInfo';

export default class NewLocationSearch extends Component {
	constructor(p){
		super(p);
		this.state = {
			searchResults: [],
		};
	}

	render() {
		const renderedSearchResults = this.state.searchResults.map(result => {
			const locationInfo = {
				position: [
					result.lat,
					result.lon,
				],
				title: result.namedetails.name,
				location: result.address.city + ', ' + result.address.state + ', ' + result.address.country_code,
				category: 'attractions',
			};
			return (
				<LocationInfo
					location={locationInfo}
					addLocationFct={() => this.props.addLocationFct(locationInfo)}
				/>
			);
		});

		return (
			<div>
				<h1>Add a location to your trip</h1>
				<form
					onSubmit={e => {
						e.preventDefault();
						const formData = new FormData(e.target);
						const keywords = formData.get('keywords');
						const osmAPI = new SearchOSM();
						osmAPI.searchOSM(keywords).then(searchResults => this.setState({ searchResults }));
					}}
					className="mb-2"
				>
					<div className="form-group">
						<label htmlFor="keywords">Keywords</label>
						<input
							className="form-control"
							name="keywords"
							id="keywords"
							type="search"
						/>
					</div>
					<div style={{ 'textAlign': 'right' }}>
						<button className="btn btn-primary">
							<FontAwesomeIcon icon="search" />
						</button>
					</div>
				</form>
				<div className="search-results">
					{renderedSearchResults}
				</div>
			</div>
		)
	}
}
