import React, { Component } from 'react'
import { SearchOSM } from '../utils/SearchOSM';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LocationInfo from './LocationInfo';
import { uniqueId } from '../utils/unique-id';

export default class NewLocationSearch extends Component {
	constructor(p){
		super(p);
		this.state = {
			searchResults: [],
		};
	}

	processSearchResults(rawSearchResults) {
		const searchResults = rawSearchResults.map(result => {
			return {
				position: [
					result.lat,
					result.lon,
				],
				title: result.namedetails.name,
				location: result.address.city + ', ' + result.address.state + ', ' + result.address.country_code.toUpperCase(),
				category: 'search-result',
				uid: uniqueId(),
			};
		});
		this.setState({ searchResults });
	}

	onSearchFormSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const keywords = formData.get('keywords');
		const osmAPI = new SearchOSM();
		osmAPI.searchOSM(keywords).then(this.processSearchResults.bind(this));
	}

	clearSearchResults() {
		this.setState({ searchResults: [] });
	}

	render() {
		const { addLocationFct, removeLocationFct, highlightFct } = this.props;

		const renderedSearchResults = this.state.searchResults.map(locationInfo => {
			return (
				<LocationInfo
					location={locationInfo}
					onMouseOver={() => addLocationFct(locationInfo)}
					onMouseOut={() => removeLocationFct(locationInfo)}
					addLocationFct={() => {
						addLocationFct({
							...locationInfo,
							category: 'attractions',
							uid: uniqueId(),
						})
					}}
				/>
			);
		});

		return (
			<div>
				<h1>Add a location to your trip</h1>
				<form
					onSubmit={this.onSearchFormSubmit.bind(this)}
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
						<button
							type="button"
							className="btn btn-danger mr-2"
							onClick={this.clearSearchResults.bind(this)}>Clear search results</button>
						<button
							type="submit"
							className="btn btn-primary">
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
