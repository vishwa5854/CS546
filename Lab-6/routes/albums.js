import { Router } from "express";
import { validationsForObjectId } from "../helpers.js";
import { getAll, create, get, remove } from "../data/albums.js";
import { validateCreateAlbum } from "../helpers.js";

const router = Router();

router.get("/:bandId", async (req, res) => {
	try {
		let bandId = req.params.bandId;
		validationsForObjectId("bandId", bandId, false);

		let albums = await getAll(bandId);

		if (albums.length === 0) return res.status(404).send("Error: No albums found for this band");
		return res.status(200).send(albums);
	} catch (err) {
		if (err === "VError: Band not found") return res.status(404).send(err.substr(1));

		if ((typeof err === "string") && err.startsWith("VError")) return res.status(400).send(err.substr(1));
		return res.status(500).send("Uh! Oh, something wrong from our side, we will fix it! :)");
	}
});

router.post("/:bandId", async (req, res) => {
	try {
		let bandId = req.params.bandId;
		validationsForObjectId("bandId", bandId, false);
		let { title, releaseDate, tracks, rating } = req.body;
		validateCreateAlbum(bandId, title, releaseDate, tracks, rating);

		return res.status(200).send(await create(bandId, title, releaseDate, tracks, rating));
	} catch (err) {
		if (err === "VError: Band not found") return res.status(404).send(err.substr(1));

		if ((typeof err === "string") && err.startsWith("VError")) return res.status(400).send(err.substr(1));
		return res.status(500).send("Uh! Oh, something wrong from our side, we will fix it! :)");
	}
});

router.get('/album/:albumId', async (req, res) => {
	try {
		let albumId = req.params.albumId;

		if (!albumId) throw "VError: Album id is required to remove the album";
		validationsForObjectId("albumId", albumId, false);

		return res.status(200).send(await get(albumId));
	} catch (err) {
		if (err === "VError: Album not found") return res.status(404).send(err.substr(1));

		if ((typeof err === "string") && err.startsWith("VError")) return res.status(400).send(err.substr(1));
		return res.status(500).send("Uh! Oh, something wrong from our side, we will fix it! :)");
	}
});

router.delete("/album/:albumId", async (req, res) => {
	try {
		let albumId = req.params.albumId;

		if (!albumId) throw "VError: Album id is required to remove the album";
		validationsForObjectId("albumId", albumId, false);

		await remove(albumId.trim());
		return res.status(200).send({ "albumId": albumId.trim(), "deleted": true });
	} catch (err) {
		if (err === "VError: Album not found") return res.status(404).send(err.substr(1));

		if ((typeof err === "string") && err.startsWith("VError")) return res.status(400).send(err.substr(1));
		return res.status(500).send("Uh! Oh, something wrong from our side, we will fix it! :)");
	}
});

export default router;
