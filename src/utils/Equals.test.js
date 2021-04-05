describe('Misc equality tests', () => {
	test('string strict equality', () => {
		expect('A string' === 'A string').toBeTruthy();
	});
	
	test('string loose equality', () => {
		expect('A string' == 'A string').toBeTruthy();
	});
});

describe('Array.some() test', () => {
	test('Some works as I expected', () => {
		const theArray = [
			{anobject: 'a'},
			{anobject: 'c'},
			{anobject: 'a'},
		];
		expect(theArray.some(e => e.anobject === 'a')).toBeTruthy();
		expect(theArray.some(e => e.anobject === 'b')).toBeFalsy();
	});
});