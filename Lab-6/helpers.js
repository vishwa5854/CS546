import { ObjectId } from "mongodb";
import validator from "validator";

const isJustAString = (e) => (typeof e === "string");

const isJustEmptySpaces = (e) => e.trim().length === 0;

const validationsForStrings = (name, value, allowEmptyStrings = false) => {
	if (!value) throw `VError: ${name} parameter should exist`;

	if (!isJustAString(value)) throw `VError: ${name} parameter should be a string`;

	if (isJustEmptySpaces(value) && !allowEmptyStrings) throw `VError: ${name} parameter cannot be just an empty string or just whitespaces`;
}

const validationsForObjectId = (name, value, allowEmptyStrings = false) => {
	validationsForStrings(name, value, allowEmptyStrings);

	if (!ObjectId.isValid(value.trim())) throw `VError: ${name} is not valid`;
};

const isValidString = (e) => isJustAString(e) && !isJustEmptySpaces(e);

const isNumber = (e) => (typeof e === "number") && (!isNaN(e));

const validateCreateBand = (name, genre, website, recordCompany, groupMembers, yearBandWasFormed) => {
	if (!name || !genre || !website || !recordCompany || !groupMembers || !yearBandWasFormed) throw "VError: All fields need to have valid values";

	validationsForStrings("name", name, false);
	validationsForStrings("website", website, false);
	validationsForStrings("recordCompany", recordCompany, false);
	const minimumWebsiteLength = "http://www.".length + 5 + ".com".length;
	website = website.trim().toLowerCase();

	if (!website.startsWith("http://www.") || !website.endsWith(".com") || website.length < minimumWebsiteLength) throw `VError: Website URL must start with 
		http://www. and should end with .com and should have at least 5 characters in-between`;

	if (!Array.isArray(genre) || !Array.isArray(groupMembers)) throw "VError: Genre & Group members should be arrays";

	if ((genre.length === 0) || (groupMembers.length === 0)) throw "VError: Genre or Group members cannot be empty";

	if (!genre.every(isValidString)) throw "VError: Each elemet in genre must be a non empty string";

	if (!groupMembers.every(isValidString)) throw "VError: Each elemet in groupMembers must be a non empty string";

	if (!Number.isInteger(yearBandWasFormed)) throw "VError: yearBandWasFormed should be an integer";

	if (!isNumber(yearBandWasFormed) || (yearBandWasFormed < 1900) || (yearBandWasFormed > 2023)) throw "VError: only years 1900-2023 are valid values";
};

const validateUpdateBand = (id, name, genre, website, recordCompany, groupMembers, yearBandWasFormed) => {
	validationsForObjectId("id", id, false);
	validateCreateBand(name, genre, website, recordCompany, groupMembers, yearBandWasFormed);
}

const validateCreateAlbum = (bandId, title, releaseDate, tracks, rating) => {
	if (!bandId || !title || !releaseDate || !tracks || !rating) throw "VError: All fields need to have valid values";

	validationsForStrings("bandId", bandId, false);
	validationsForStrings("title", title, false);
	validationsForStrings("releaseDate", releaseDate, false);
	validationsForObjectId("bandId", bandId, false);
	releaseDate = releaseDate.trim();

	if (!validator.isDate(releaseDate, "MM/DD/YYYY")) throw "VError: Release date must be of proper type MM/DD/YYYY";

	let year = Number(releaseDate.split('/')[2]);
	if ((year < 1900) || (year > new Date().getFullYear() + 1)) throw `VError: Release date must be in between 1900 & ${new Date().getFullYear() + 1}`;

	if (!Array.isArray(tracks) || (tracks.length < 3)) throw "VError: Tracks must be an array of strings with minimum length of 3";

	if (!tracks.every(isValidString)) throw "VError: All the tracks must be non empty strings";

	if (!isNumber(rating) || (rating < 1) || (rating > 5) || (Number(rating.toFixed(1)) !== rating)) throw "VError: Rating should be in between 1 & 5";
}

export {
	isJustAString,
	isJustEmptySpaces,
	validationsForStrings,
	isValidString,
	isNumber,
	validationsForObjectId,
	validateCreateBand,
	validateUpdateBand,
	validateCreateAlbum
};
