import { validateCreateAlbum, validationsForObjectId } from "../helpers.js";
import { ObjectId } from "mongodb";
import { bands } from "../config/mongoCollections.js";

const create = async (bandId, title, releaseDate, tracks, rating) => {
	validateCreateAlbum(bandId, title, releaseDate, tracks, rating);

	bandId = bandId.trim();
	title = title.trim();
	releaseDate = releaseDate.trim();
	tracks = tracks.map(t => t.trim());
	let document = { _id: new ObjectId(), title, releaseDate, tracks, rating };
	bandId = new ObjectId(bandId);
	let bandsCollection = await bands();

	let alreadyExists = await bandsCollection.findOne({ 'albums.title': title, _id: bandId });

	if (alreadyExists) throw "VError: Album already exists with this name in this band"; 

	let updated = await bandsCollection.findOneAndUpdate({ _id: bandId }, { $push: { albums: document } }, { returnDocument: 'after' });

	if (!updated.value) throw "VError: Band not found";

	if (updated.lastErrorObject.n === 0) throw `VError: Couldn't update band's albums with id : ${bandId}`;
	let overallRating = (updated.value.albums.reduce((acc, curr) => acc + curr.rating, 0)) / updated.value.albums.length;

	/** We need to update the overallRating in the band document to account for the new album */
	await bandsCollection.updateOne({ _id: bandId }, { $set: { overallRating: Number(overallRating.toFixed(1)) } });

	if (updated.lastErrorObject.n === 0) throw `VError: Couldn't update band's overallRating with id : ${bandId}`;
	return { ...document, _id: document._id.toString() };
};

const getAll = async (bandId) => {
	if (!bandId) throw "VError: Band id is required to get all the albums";
	validationsForObjectId("bandId", bandId, false);

	let band = (await (await bands()).findOne({ _id: new ObjectId(bandId.trim()) }, { projection: { albums: true } }));

	if (!band) throw `VError: Band not found`;
	return band.albums.map(a => { return { ...a, _id: a._id.toString() } });
};

const get = async (albumId) => {
	if (!albumId) throw "VError: Album id required to get the album";
	validationsForObjectId("albumId", albumId, false);

	let album = (await (await bands()).findOne({ 'albums._id': new ObjectId(albumId.trim()) }, { projection: { 'albums.$': true } }));

	if (!album) throw `VError: Album not found`;
	return { ...album.albums[0], _id: album.albums[0]._id.toString() };
};

const remove = async (albumId) => {
	if (!albumId) throw "VError: Album id is required to remove the album";
	validationsForObjectId("albumId", albumId, false);
	albumId = new ObjectId(albumId.trim());

	let bandsCollection = await bands();

	let updatedObj = await bandsCollection.findOneAndUpdate({ 'albums._id': albumId }, { $pull: { albums: { _id: albumId } } }, { returnDocument: 'after' });

	if (!updatedObj.value) throw "VError: Album not found";

	if (updatedObj.lastErrorObject.n === 0) throw `VError: Couldn't update band's albums with id : ${albumId}`;
	let n_albums = updatedObj.value.albums.length;
	let overallRating = n_albums === 0 ? 0 : (updatedObj.value.albums.reduce((acc, curr) => acc + curr.rating, 0)) / n_albums;

	await bandsCollection.updateOne({ _id: updatedObj.value._id }, { $set: { overallRating: Number(overallRating.toFixed(1)) } });
	return { ...updatedObj.value, _id: updatedObj.value._id.toString(), overallRating };
};

export { create, getAll, get, remove };
