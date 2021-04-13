
import { SearchOSM } from './SearchOSM';

let searchObject = null;
const queryURL = 'https://nominatim.openstreetmap.org/search?q=Concordia+University+Montreal&format=json&addressdetails=1&extratags=1&namedetails=1';

beforeEach(() => {
	searchObject = new SearchOSM();
});

test('URL with search params encoded correctly', () => {
	expect(searchObject.makeURL('Concordia University Montreal')).toEqual(queryURL);
});

// test('Search returns good result as JSON object', () => {
// 	return searchObject.query(queryURL).then(data => {
// 		expect(data).toEqual(expectedResult);
// 	});
// });