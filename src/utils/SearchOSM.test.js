
import { SearchOSM } from './SearchOSM';

let searchObject = null;
const queryURL = 'https://nominatim.openstreetmap.org/search?q=Concordia+University+Montreal&format=json';
const expectedResultString = '[{"place_id":13554067,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","osm_type":"node","osm_id":1263357006,"boundingbox":["45.4955411","45.4956411","-73.5775543","-73.5774543"],"lat":"45.4955911","lon":"-73.5775043","display_name":"FOFA Gallery, 1515, Rue Sainte-Catherine Ouest, Montagne, Ville-Marie, Montreal, Urban agglomeration of Montreal, Montreal (06), Quebec, H3H 2T2, Canada","class":"tourism","type":"gallery","importance":0.11100000000000002},{"place_id":45181848,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","osm_type":"node","osm_id":3583635757,"boundingbox":["45.4576738","45.4577738","-73.6405465","-73.6404465"],"lat":"45.4577238","lon":"-73.6404965","display_name":"Loyola Campus Bookstore, 7141, Sherbrooke Street West, Loyola, Côte-des-Neiges–Notre-Dame-de-Grâce, Montreal, Urban agglomeration of Montreal, Montreal (06), Quebec, H4B 1R6, Canada","class":"shop","type":"books","importance":0.11100000000000002}]';
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