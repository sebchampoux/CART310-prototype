
export class SearchOSM {
	makeURL(keywords) {
		const BASE_URL = 'https://nominatim.openstreetmap.org/search?';

		const params = new URLSearchParams();
		params.append('q', keywords);
		params.append('format', 'json');
	
		return BASE_URL + params.toString();
	}

	query(url) {
		return new Promise((resolve, reject) => {
			const ajax = new XMLHttpRequest();
			ajax.addEventListener('load', e => {
				if (e.target.status >= 200 && e.target.status < 300) {
					resolve(JSON.parse(e.target.response));
				} else {
					reject(e);
				}
			});
			ajax.addEventListener('error', e => {
				console.error('AJAX request failed, see details below.');
				console.log(e);
				reject(e);
			});
			ajax.open('GET', url);
			ajax.send();
		});
	}

	searchOSM(keywords) {
		const url = this.makeURL(keywords);
		return this.query(url);
	}
}