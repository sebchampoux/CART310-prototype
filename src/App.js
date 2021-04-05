import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import InteractiveMap from './components/InteractiveMap';
import LocationInfo from './components/LocationInfo';
import SectionTitle from './components/SectionTitle';
import Sidebar from './components/Sidebar';
import { categories } from './utils/Categories';
import NewLocationSearch from './components/NewLocationSearch';
import { uniqueId } from './utils/unique-id';

export default class App extends Component {
  constructor(p) {
    super(p);
    this.state = {
      showNewComponentPopUp: false,
      categories,
      locations: [
        {
          position: [45.4687, -73.7465],
          title: 'Montreal Airport',
          location: 'Dorval, Québec, CA',
          category: 'transportation',
          uid: uniqueId(),
        },
        {
          position: [38.852597251193025, -77.04019273228096],
          title: 'Reagan International Airport',
          location: 'Washington, DC',
          category: 'transportation',
          uid: uniqueId(),
        },
        {
          position: [38.90117588377537, -77.00639981198697],
          title: 'Hertz Car Rental',
          location: 'Washington, DC, US',
          category: 'transportation',
          uid: uniqueId(),
        },
        {
          position: [39.196479908240214, -76.61218458998884],
          title: 'Hampton Inn.',
          location: 'Baltimore, Maryland, US',
          category: 'hotels',
          uid: uniqueId(),
        },
        {
          position: [39.19871363857635, -76.68228917166556],
          title: 'Chili\'s',
          location: 'Lithicum Heights, Maryland, US',
          category: 'restaurants',
          uid: uniqueId(),
        },
        {
          position: [38.9063118534699, -76.7725181286138],
          title: 'Six Flags America',
          location: 'Bowie, Maryland, US',
          category: 'attractions',
          uid: uniqueId(),
        },
      ],
    };
  }

  addNewLocation(newLocationInfo) {
    const locations = this.state.locations.slice();
    locations.push(newLocationInfo);
    this.setState({ locations });
  }

  deleteLocation(locationToRemove) {
    const locations = this.state.locations.slice();
    const indexToRemove = locations.findIndex(l => l.uid === locationToRemove.uid);
    if (indexToRemove > -1) {
      locations.splice(indexToRemove, 1);
      this.setState({ locations });
    }
  }

  render() {
    const locationsList = this.state.categories.map(this.printCategory.bind(this));

    return (
      <div className="app-root">
        <Sidebar className="locations-sidebar">
          <div className="locations-sidebar__locs-list">
            {locationsList}
          </div>
          <button
            className="btn btn-primary btn-block"
            onClick={this.openNewTripComponentPopUp.bind(this)}
          >
            <FontAwesomeIcon icon="plus-circle" /> Add new trip component
          </button>
        </Sidebar>
        <InteractiveMap
          locations={this.state.locations}
          highlightFct={this.changeLocationHighlight.bind(this)}
        />
        {this.state.showNewComponentPopUp &&
          <Sidebar className="new-locations-sidebar app-root__new-location-sidebar">
            <button
              className="btn btn-danger sidebar__close-btn"
              onClick={this.closeNewTripComponentPopUp.bind(this)}
            >
              <FontAwesomeIcon icon="times" />
            </button>
            <NewLocationSearch
              addLocationFct={this.addNewLocation.bind(this)}
              removeLocationFct={this.deleteLocation.bind(this)}
            />
            <p className="new-locations-sidebar__advanced-links">
              <a href="#" className="new-locations-sidebar__link">More results...</a>
              <br />
              <a href="#" className="new-locations-sidebar__link">Advanced search</a>
            </p>
          </Sidebar>
        }
      </div>
    )
  }

  openNewTripComponentPopUp() {
    this.setState({ showNewComponentPopUp: true });
  }

  closeNewTripComponentPopUp() {
    this.setState({ showNewComponentPopUp: false });
  }

  changeLocationHighlight(currentLocation, highlighted) {
    const locations = this.state.locations.slice();
    const locationIndex = locations.indexOf(currentLocation);
    if (locationIndex > -1) {
      const newLocation = {
        ...currentLocation,
        highlighted,
      };
      locations[locationIndex] = newLocation;
      this.setState({ locations });
    }
  }

  printCategory(category) {
    const locations = this.printLocationsForCategory(category);

    return (
      <div className="locations-categories-wrapper">
        <SectionTitle
          key={category.key}
          icon={category.icon}
          title={category.title}
        />
        {locations}
      </div>
    );
  }

  printLocationsForCategory(category) {
    return this.state.locations
      .filter(location => location.category === category.key)
      .map(this.printLocation.bind(this));
  }

  printLocation(location) {
    return (
      <LocationInfo
        key={location.uid}
        location={location}
        deleteLocationFct={() => this.deleteLocation(location)}
        onMouseOver={() => this.changeLocationHighlight(location, true)}
        onMouseOut={() => this.changeLocationHighlight(location, false)}
      />
    );
  }
}
