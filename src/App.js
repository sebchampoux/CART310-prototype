import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import InteractiveMap from './components/InteractiveMap';
import LocationInfo from './components/LocationInfo';
import SectionTitle from './components/SectionTitle';
import Sidebar from './components/Sidebar';
import { categories } from './utils/Categories';
import NewLocationPopUp from './components/NewLocationPopUp';

export default class App extends Component {
  constructor(p) {
    super(p);
    this.state = {
      showNewComponentPopUp: false,
      categories,
      locations: [
        {
          position: [45.4687,-73.7465],
          title: 'Montreal Airport',
          location: 'Dorval, Québec, CA',
          category: 'transportation',
        },
        {
          position: [38.90117588377537, -77.00639981198697],
          title: 'Hertz Car Rental',
          location: 'Washington, DC, US',
          category: 'transportation',
        },
        {
          position: [39.196479908240214, -76.61218458998884],
          title: 'Hampton Inn.',
          location: 'Baltimore, Maryland, US',
          category: 'hotels',
        },
        {
          position: [39.19871363857635, -76.68228917166556],
          title: 'Chili\'s',
          location: 'Lithicum Heights, Maryland, US',
          category: 'restaurants',
        },
        {
          position: [38.9063118534699, -76.7725181286138],
          title: 'Six Flags America',
          location: 'Bowie, Maryland, US',
          category: 'attractions',
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
    const indexToRemove = locations.indexOf(locationToRemove);
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
            onClick={this.openNewTripComponent.bind(this)}
          >
            <FontAwesomeIcon icon="plus-circle" /> Add new trip component
          </button>
        </Sidebar>
        <InteractiveMap locations={this.state.locations} />
        {this.state.showNewComponentPopUp &&
          <NewLocationPopUp
            addLocationFct={this.addNewLocation.bind(this)}
            closeFct={this.closeNewTripComponent.bind(this)}
          />
        }
      </div>
    )
  }

  openNewTripComponent() {
    this.setState({ showNewComponentPopUp: true });
  }

  closeNewTripComponent() {
    this.setState({ showNewComponentPopUp: false });
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
        key={location.position.toString()}
        location={location}
        deleteLocationFct={() => this.deleteLocation(location)}
      />
    );
  }
}
