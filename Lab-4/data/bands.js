import { validationsForStrings, isValidString, isNumber, validationsForObjectId } from "../helpers.js";
import { bands } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

const create = async (name, genre, website, recordCompany, groupMembers, yearBandWasFormed) => {
	if (!name || !genre || !website || !recordCompany || !groupMembers || !yearBandWasFormed) throw "All fields need to have valid values";

	validationsForStrings("name", name, false);
	validationsForStrings("website", website, false);
	validationsForStrings("recordCompany", recordCompany, false);
	const minimumWebsiteLength = "http://www.".length + 5 + ".com".length;
	website = website.trim();
	let comparator = website.toLowerCase();

	if (!comparator.startsWith("http://www.") || !comparator.endsWith(".com") || website.length < minimumWebsiteLength) 
		throw `Error: Website URL must start with http://www. and should end with .com and should have at least 5 characters in-between`;

	if (!Array.isArray(genre) || !Array.isArray(groupMembers)) throw "Error: Genre & Group members should be arrays";

	if ((genre.length === 0) || (groupMembers.length === 0)) throw "Error: Genre or Group members cannot be empty";

	if (!genre.every(isValidString)) throw "Error: Each elemet in genre must be a non empty string";

	if (!groupMembers.every(isValidString)) throw "Error: Each elemet in groupMembers must be a non empty string";

	if (!isNumber(yearBandWasFormed) || (yearBandWasFormed < 1900) || (yearBandWasFormed > 2023)) throw "Error: only years 1900-2023 are valid values";

	name = name.trim();
	recordCompany = recordCompany.trim();
	genre = genre.map(g => g.trim());
	groupMembers = groupMembers.map(g => g.trim());

	let bandsCollection = await bands();
	let newBand = { name, genre, website, recordCompany, groupMembers, yearBandWasFormed };

	const { acknowledged, insertedId } = await bandsCollection.insertOne(newBand);

	if (!acknowledged || !insertedId) throw "Error: Couldn't add band";

	return { ...newBand, _id: insertedId.toString() };
};

const getAll = async () => (await (await bands()).find({}).toArray()).map(e => { return { ...e, _id: e._id.toString() } });

const get = async (id) => {
	validationsForObjectId("id", id, false);
	id = id.trim();

	let res = (await (await bands()).findOne({ _id: new ObjectId(id) }));

	if (!res) throw "Error: Band not found";
	return { ...res, _id: res._id.toString() };
};

const remove = async (id) => {
	validationsForObjectId("id", id, false);
	id = id.trim();

	let deleted = await (await bands()).findOneAndDelete({ _id: new ObjectId(id) });

	if (deleted.lastErrorObject.n === 0) throw `Error: Couldn't delete band with id : ${id}`;
	return `${deleted.value.name} has been successfully deleted!`
};

const rename = async (id, newName) => {
	validationsForObjectId("id", id, false);
	validationsForStrings("newName", newName, false);
	id = id.trim();
	newName = newName.trim();

	let updated = await (await bands()).findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { name: newName } });

	if (updated.lastErrorObject.n === 0) throw `Error: Couldn't rename band with id : ${id}`;

	if (updated.value.name === newName) throw "Error: New name cannot be same as the old name.";

	return { ...updated.value, name: newName, _id: updated.value._id.toString() };
};

export { create, getAll, get, remove, rename };