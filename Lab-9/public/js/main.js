/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:

Get the value of the input text element.  
You will take in the text input , convert it to all lowercase and generate some text statistics based on the input.
You will calculate the following statistics based on the text:
Original Input: you will just show the input that the user entered (see below)
Total Letters: total number of letter characters in the text ,
Total Non-Letters: total number of non-letters in the text (including spaces),
Total Vowels: total number of vowels in the text (not counting y),
Total Consonants: total number of consonants in the text (counting y),
Total Words: total number of words in the text; a word is defined as any sequence of letters broken by any not-letter. For example, the phrase to-do is two words; a word does not start until a letter appears,
Unique Words: total number of unique words that appear in the lowercased text,
Long Words: number of words in the text that are 6 or more letters long; this is a total count of individual words, not unique words,
Short Words: number of words in the text that are 3 or less letters long; this is a total count of individual words, not unique words
This lab is easy to over-complicate by attempting to be too clever. I am giving two important pieces of advice:

You will generate the following HTML every time the application processes the text and append it to the results div.  
You will be using a data list element (dl), inside the dl, you will have a data title (dt) that has the title of the stat and then a data description (dd) which has the value. (see expected output below)

Here is the output based on the input: "Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23"
<dl>

  <dt>Original Input:</dt>

  <dd>Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23</dd>

  <dt>Total Letters</dt>

  <dd>40</dd>

  <dt>Total Non-Letters</dt>

  <dd>27</dd>

  <dt>Total Vowels</dt>

  <dd>13</dd>

  <dt>Total Consonants</dt>

  <dd>26</dd>

  <dt>Total Words</dt>

  <dd>11</dd>

  <dt>Unique Words</dt>

  <dd>9</dd>

  <dt>Long Words</dt>

  <dd>3</dd>

  <dt>Short Words</dt>

  <dd>3.6363636363636362</dd>

</dl>
*/

let isLetter = ascii => ((65 <= ascii) && (ascii <= 90)) || ((97 <= ascii) && (ascii <= 122));

let isVowel = char => ["a", "e", "i", "o", "u"].includes(char);

let addResultsToDOM = (results, keys) => {
	let parent = document.getElementById("results");

	let dlElement = document.createElement('dl');

	keys.forEach(k => {
		let dtElement = document.createElement('dt');
		dtElement.innerText = k;
		dlElement.appendChild(dtElement);

		let ddElement = document.createElement('dd');
		ddElement.innerText = results[k];
		dlElement.appendChild(ddElement);
	});

	parent.appendChild(dlElement);
};

let hasValidInput = (val) => {
	let errorElement = document.getElementById("error");

	if (val.trim().length === 0) {
		errorElement.hidden = false;
		errorElement.style.display = "block";
		errorElement.innerText = "Input cannot be empty";
		
		return false;
	} else {
		errorElement.style.display = "none";
		errorElement.hidden = true;
	}
	return true;
};

addEventListener("submit", (event) => {
	let value = event.target[0].value;
	let original = value;
	value = value.toLowerCase();

	event.target[0].value = "";
	event.preventDefault();

	if (!hasValidInput(value)) return;

	let totalLetters = 0;
	let totalVowels = 0;
	let totalConsonants = 0;
	let totalWords = 0;
	let uniqueWords = 0;
	let longWords = 0;
	let shortWords = 0;
	let isPreviousCharLetter = false;
	let temp = "";
	let words = {};

	for (let i = 0; i < value.length; i++) {
		let ascii = value.charCodeAt(i);
		let char = value.charAt(i).toLowerCase();

		if (isLetter(ascii)) {
			temp += char;
			isPreviousCharLetter = true;
			totalLetters++;

			if (isVowel(char)) {
				totalVowels++;
			} else {
				totalConsonants++;
			}
		} else {
			if ((totalLetters > 0) && isPreviousCharLetter) totalWords++;
			isPreviousCharLetter = false;

			if (temp.length >= 6) longWords++;
			else if ((temp.length <= 3) && (temp !== "")) shortWords++;

			if (!(temp in words) && (temp !== "")) {
				words[temp] = 1;
				uniqueWords++
			};
			temp = "";
		}
	}

	let totalNonLetters = value.length - totalLetters;

	addResultsToDOM({
		"Original Input:": original,
		"Total Letters": totalLetters,
		"Total Non-Letters": totalNonLetters,
		"Total Vowels": totalVowels,
		"Total Consonants": totalConsonants,
		"Total Words": totalWords,
		"Unique Words": uniqueWords,
		"Long Words": longWords,
		"Short Words": shortWords
	}, [
		"Original Input:",
		"Total Letters",
		"Total Non-Letters",
		"Total Vowels",
		"Total Consonants",
		"Total Words",
		"Unique Words",
		"Long Words",
		"Short Words"
	]);
});
