//TODO we may want to replace this with https://github.com/WICG/async-cookies-api at some point in the future

// Regex taken from https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie don't ask me how it works
function getRegexForName (name){
	return new RegExp(`(?:(?:^|.*;\\s*)${name}\\s*\=\\s*([^;]*).*$)|^.*$`);
}

function getOptions (options){
	return Object.keys(options).map(key => {
		let newKey = key;
		if(key === 'maxAge'){
			newKey = 'max-age';
		}

		if(options[key] instanceof Date){
			options[key] = options[key].toUTCString();
		}

		return `${newKey}=${options[key]}`;
	});
}

function set (name, value, opts = {}){
	const options = getOptions(opts).join('; ');
	const cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; ${options}`;
	document.cookie = cookie;
}

function get (name){
	return decodeURIComponent(document.cookie.replace(getRegexForName(encodeURIComponent(name)), '$1'));
}

function has (name){
	return new RegExp(encodeURIComponent(name) + '=').test(document.cookie);
}

function remove (name){
	return set(name, '', {expires:new Date(0)});
}

module.exports = {get, set, has, getRegexForName, remove};
