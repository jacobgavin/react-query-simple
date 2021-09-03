import md5 from 'md5';


export default function Query() {
	this.cache = {};

	this.getCache = function() {
		return this.cache;
	}

	this.setCache = function(key, value) {
		this.cache[key] = value;
	}

	this.callAsync = async function(fetchFn, { queryKey }) {
		
		console.log('callAsync', queryKey)
		if (this.getCache()[queryKey]) {
			console.log('found cache', this.getCache()[queryKey])
			return this.getCache()[queryKey].then(response => {
				return response;
			}).catch(error => error)
		}
		console.log('promise start')
		this.setCache(queryKey, fetchFn());
		return fetchFn().then(response => {
			console.log('in promise ', response)
			return response;
		}).catch(error => error)
	}

	this.getQueryKey = function(key) {
		return md5(JSON.stringify(key));
	}

}