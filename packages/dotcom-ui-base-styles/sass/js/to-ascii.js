const mapASCII = {
	'à': 'a',
	'á': 'a',
	'â': 'a',
	'ä': 'a',
	'ã': 'a',
	'å': 'a',
	'ā': 'a',
	'æ': 'ae',
	'ç': 'c',
	'č': 'c',
	'è': 'e',
	'é': 'e',
	'ê': 'e',
	'ë': 'e',
	'ē': 'e',
	'ğ': 'g',
	'î': 'i',
	'ï': 'i',
	'í': 'i',
	'ì': 'i',
	'ī': 'i',
	'ł': 'l',
	'ñ': 'n',
	'ń': 'n',
	'ô': 'o',
	'ö': 'o',
	'ò': 'o',
	'ó': 'o',
	'ø': 'o',
	'õ': 'o',
	'ō': 'o',
	'œ': 'oe',
	'ş': 's',
	'ș': 's',
	'š': 's',
	'ß': 'ss',
	'û': 'u',
	'ü': 'u',
	'ù': 'u',
	'ú': 'u',
	'ū': 'u',
	'ž': 'z'
};

const nonASCII = /[^\x00-\x7F]+/;

function toASCII (string) {
	if (nonASCII.test(string) === false) {
		return string;
	}

	let i = string.length;

	while (i > -1) {
		const ascii = mapASCII[string[i]];

		if (ascii) {
			string = string.substr(0, i) + ascii + string.substr(i + 1);
		}

		i--;
	}

	return string;
}

module.exports = toASCII;
