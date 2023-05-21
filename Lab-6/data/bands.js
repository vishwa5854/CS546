import { validationsForObjectId, validateCreateBand, validateUpdateBand } from '../helpers.js';
import { bands } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import _ from 'lodash';

const create = async (name, genre, website, recordCompany, groupMembers, yearBandWasFormed) => {
	validateCreateBand(name, genre, website, recordCompany, groupMembers, yearBandWasFormed);

	name = name.trim();
	genre = genre.map(g => g.trim());
	website = website.trim();
	recordCompany = recordCompany.trim();
	groupMembers = groupMembers.map(g => g.trim());

	let bandsCollection = await bands();
	let newBand = { name, genre, website, recordCompany, groupMembers, yearBandWasFormed, albums: [], overallRating: 0 };

	const { acknowledged, insertedId } = await bandsCollection.insertOne(newBand);

	if (!acknowledged || !insertedId) throw "VError: Couldn't add band";

	return { ...newBand, _id: insertedId.toString() };
};

const getAll = async (projection = {}) => (await (await bands()).find({}, { projection }).toArray()).map(e => { return { ...e, _id: e._id.toString() } });

const get = async (id) => {
	validationsForObjectId("id", id, false);
	id = id.trim();

	let res = (await (await bands()).findOne({ _id: new ObjectId(id) }));

	if (!res) throw "VError: Band not found";
	return { ...res, _id: res._id.toString() };
};

const remove = async (id) => {
	validationsForObjectId("id", id, false);
	id = id.trim();

	let deleted = await (await bands()).findOneAndDelete({ _id: new ObjectId(id) });

	if (!deleted.value) throw "VError: Band not found";

	if (deleted.lastErrorObject.n === 0) throw `VError: Couldn't delete band with id : ${id}`;
	return `${deleted.value.name} has been successfully deleted!`
};

const update = async (id, name, genre, website, recordCompany, groupMembers, yearBandWasFormed) => {
	validateUpdateBand(id, name, genre, website, recordCompany, groupMembers, yearBandWasFormed);

	id = id.trim();
	name = name.trim();
	recordCompany = recordCompany.trim();
	genre = genre.map(g => g.trim());
	groupMembers = groupMembers.map(g => g.trim());
	website = website.trim();

	let updateObj = { name, genre, website, recordCompany, groupMembers, yearBandWasFormed };

	let bandsCollection = await bands();

	let original = await bandsCollection.findOne({ _id: new ObjectId(id) });

	if (!original) throw "VError: Band not found";
	let requestedPayload = { name, genre, website, recordCompany, groupMembers, yearBandWasFormed };
	let dbPayload = (({ name, genre, website, recordCompany, groupMembers, yearBandWasFormed }) => ({ name, genre, website, recordCompany, groupMembers, yearBandWasFormed }))(original);
	
	if (_.isEqual(requestedPayload, dbPayload)) throw "VError: Atleast one field should be different inorder to update";

	let updated = await bandsCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updateObj }, { returnDocument: 'after' });
	
	if (!updated.value) throw "VError: Band not found";

	if (updated.lastErrorObject.n === 0) throw `VError: Couldn't update band with id : ${id}`;

	return { ...updated.value, _id: updated.value._id.toString() };
};

export { create, getAll, get, remove, update };