/* Todo: Implment the functions below and then export them
	  using the ES6 exports syntax. 
	  DO NOT CHANGE THE FUNCTION NAMES
*/
import { isAlphaNumeric } from "./helpers.js";
import { isString, isJustAString, findAllIndexesInArray } from "./helpers.js";

let palindromes = (strings) => {
	if (!strings) throw "Error: Strings array should exist";

	if (!Array.isArray(strings)) throw "Error: Only array of strings are accepted";

	if (strings.length === 0) throw "Error: Array cannot be empty";

	if (!strings.every(isString)) throw "Error: Each array element in the array should be a string (No strings with empty spaces)";

	if (strings.every(str => !str)) throw "Error: Strings should exist";

	let isPalindrome = (e) => e === e.split('').reverse().join('');

	return strings.reduce((acc, string) => {
		let required = string.toLowerCase().split('').filter(e => isAlphaNumeric(e)).join('');

		if (required.length === 0) throw "Error: String should contain atleast one alpha numeric char";
		acc[required] = isPalindrome(required);
		return acc;
	}, {});
};

let censorWords = (string, badWordsList) => {
	if (!string) throw "Error: The parameter string should exist.";

	if (!isString(string)) throw "Error: string parameter should be type of string";

	if (!badWordsList) throw "Error: The parameter badWordsList should exist";

	if (!Array.isArray(badWordsList)) throw "Error: The parameter badWordsList should be typeof an array";

	if (badWordsList.length < 1) throw "Error: The parameter badWordsList should contain atleast one bad word.";

	if (!badWordsList.every(isJustAString)) throw "Error: All the words in the parameter badWordsList are expected to be strings";

	if (!badWordsList.every(word => string.toLowerCase().indexOf(word.toLowerCase())) !== -1);

	let specialChars = "!@$#", getSpecialCharacter = (idx) => specialChars[idx % 4], start = 0;
	let getMaskedChars = (length) => {
		let ans = "";

		for (let i = 0; i < length; i++) ans += getSpecialCharacter(start++);
		return ans;
	}

	badWordsList.forEach(bad => {
		while (string.toLowerCase().indexOf(bad.toLowerCase()) !== -1) {
			string = string.replace(new RegExp(bad, 'i'), getMaskedChars(bad.length));
		}
	});
	return string;
};

let distance = (string, word1, word2) => {
	if (!string) throw "Error: string parameter should exist";

	if (!word1) throw "Error: word1 parameter should exist";

	if (!word2) throw "Error: word2 parameter should exist";

	if (!isString(string)) throw "Error: string parameter should be a valid string and just not an empty string.";

	if (!isString(word1)) throw "Error: string parameter should be a valid string and just not an empty string.";

	if (!isString(word2)) throw "Error: string parameter should be a valid string and just not an empty string.";

	if (!string.split('').some(a => isAlphaNumeric(a))) throw "Error: string parameter should have characters apart from punctuations.";

	if (!word1.split('').some(a => isAlphaNumeric(a))) throw "Error: word1 parameter should have characters apart from punctuations.";

	if (!word2.split('').some(a => isAlphaNumeric(a))) throw "Error: word2 parameter should have characters apart from punctuations.";

	if (string.split(' ').length < 2) throw "Error: string parameter should have atleast two words.";
	string = string.toLowerCase();
	word1 = word1.toLowerCase();
	word2 = word2.toLowerCase();

	if (word1.localeCompare(word2) === 0) throw "Error: word1 and word2 cannot be equal";

	if ((string.indexOf(word1) === -1) || (string.indexOf(word2) === -1)) throw "Error: word1 and word2 should exist in string.";

	let w1Converted = word1.toLowerCase().split('').filter(e => isAlphaNumeric(e)).join('');
	let w2Converted = word2.toLowerCase().split('').filter(e => isAlphaNumeric(e)).join('');
	string = string.replaceAll(word1, w1Converted);
	string = string.replaceAll(word2, w2Converted);
	let requiredTokens = string.split(' ').map(a => a.split('').filter(e => isAlphaNumeric(e)).join(''));
	let w1Indices = findAllIndexesInArray(requiredTokens, w1Converted), w2Indices = findAllIndexesInArray(requiredTokens, w2Converted), ans = Number.MAX_VALUE;

	for (let i = 0; i < w1Indices.length; i++) {
		for (let j = 0; j < w2Indices.length; j++) {
			let distance = w2Indices[j] - w1Indices[i];
			if (distance > 0) ans = Math.min(ans, distance);
		}
	}

	if (ans === Number.MAX_VALUE) throw "Error: Word2 appears before word1";

	return ans;
};

export { palindromes, censorWords, distance };