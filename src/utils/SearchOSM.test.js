
import { SearchOSM } from './SearchOSM';

let searchObject = null;
const queryURL = 'https://nominatim.openstreetmap.org/search?q=Concordia+University+Montreal&format=json&addressdetails=1&extratags=1&namedetails=1';
const expectedResultString = '[{"place_id":13554067,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","osm_type":"node","osm_id":1263357006,"boundingbox":["45.4955411","45.4956411","-73.5775543","-73.5774543"],"lat":"45.4955911","lon":"-73.5775043","display_name":"FOFA Gallery, 1515, Rue Sainte-Catherine Ouest, Montagne, Ville-Marie, Montreal, Urban agglomeration of Montreal, Montreal (06), Quebec, H3H 2T2, Canada","class":"tourism","type":"gallery","importance":0.11100000000000002,"address":{"tourism":"FOFA Gallery","house_number":"1515","road":"Rue Sainte-Catherine Ouest","neighbourhood":"Montagne","suburb":"Ville-Marie","city":"Montreal","county":"Urban agglomeration of Montreal","region":"Montreal (06)","state":"Quebec","postcode":"H3H 2T2","country":"Canada","country_code":"ca"},"extratags":{"website":"fofagallery.concordia.ca","operator":"Concordia University","wheelchair":"yes","opening_hours":"Mo-Fr 11:00-18:00"},"namedetails":{"name":"FOFA Gallery","operator":"Concordia University"}},{"place_id":45181848,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","osm_type":"node","osm_id":3583635757,"boundingbox":["45.4576738","45.4577738","-73.6405465","-73.6404465"],"lat":"45.4577238","lon":"-73.6404965","display_name":"Loyola Campus Bookstore, 7141, Sherbrooke Street West, Loyola, Côte-des-Neiges–Notre-Dame-de-Grâce, Montreal, Urban agglomeration of Montreal, Montreal (06), Quebec, H4B 1R6, Canada","class":"shop","type":"books","importance":0.11100000000000002,"address":{"shop":"Loyola Campus Bookstore","house_number":"7141","road":"Sherbrooke Street West","neighbourhood":"Loyola","suburb":"Côte-des-Neiges–Notre-Dame-de-Grâce","city":"Montreal","county":"Urban agglomeration of Montreal","region":"Montreal (06)","state":"Quebec","postcode":"H4B 1R6","country":"Canada","country_code":"ca"},"extratags":{"operator":"Concordia University","opening_hours":"09:00-17:00"},"namedetails":{"name":"Loyola Campus Bookstore","operator":"Concordia University"}}]';
const expectedResult = JSON.parse(expectedResultString);

beforeEach(() => {
	searchObject = new SearchOSM();
});

test('URL with search params encoded correctly', () => {
	expect(searchObject.makeURL('Concordia University Montreal')).toEqual(queryURL);
});

test('Search returns good result as JSON object', () => {
	return searchObject.query(queryURL).then(data => {
		expect(data).toEqual(expectedResult);
	});
});