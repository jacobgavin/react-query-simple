

export default function Query() {
	this.cache = {};

	this.getCache = function() {
		return this.cache;
	}

	this.setCache = function(key, value) {
		this.cache[key] = value;
	}

	this.callAsync = async function(url) {
		if (this.getCache()[url]) {
			return this.getCache()[url];
		}
		const response = await fetch(url);
		const data = await response.json();
		this.setCache(url, data);
		return data;
	}

}