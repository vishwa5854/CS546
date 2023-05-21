import { Router } from "express";
import { getAll, create, get, remove, update } from "../data/bands.js";
import { validateCreateBand, validationsForObjectId, validateUpdateBand } from "../helpers.js";

const router = Router();

router.get("/", async (req, res) => {
	try {
		return res.send(await getAll({ name: true }));
	} catch (err) {
		return res.status(500).send("Uh! Oh, something wrong from our side, we will fix it! :)");
	}
});

router.post("/", async (req, res) => {
	try {
		if (!req.body) return res.status(400).send("All fields need to have valid values");

		if (Object.keys(req.body).length === 0) return res.status(400).send("All fields need to have valid values");
		
		let { name, genre, website, recordCompany, groupMembers, yearBandWasFormed } = req.body;
		
		validateCreateBand(name, genre, website, recordCompany, groupMembers, yearBandWasFormed);
		
		return res.status(200).send(await create(name, genre, website, recordCompany, groupMembers, yearBandWasFormed));
	} catch (err) {
		if ((typeof err === "string") && err.startsWith("VError")) return res.status(400).send(err.substr(1));
		return res.status(500).send("Uh! Oh, something wrong from our side, we will fix it! :)");
	}
});

router.get("/:id", async (req, res) => {
	try {
		let id = req.params.id;
		
		validationsForObjectId("id", id, false);
		
		return res.status(200).send(await get(id));
	} catch (err) {
		if (err === "VError: Band not found") return res.status(404).send(err.substr(1));

		if ((typeof err === "string") && err.startsWith("VError")) return res.status(400).send(err.substr(1));
		return res.status(500).send("Uh! Oh, something wrong from our side, we will fix it! :)");
	}
});

router.put("/:id", async (req, res) => {
	try {
		let id = req.params.id;
		
		let { name, genre, website, recordCompany, groupMembers, yearBandWasFormed } = req.body;
		
		validateUpdateBand(id, name, genre, website, recordCompany, groupMembers, yearBandWasFormed);

		return res.status(200).send(await update(id, name, genre, website, recordCompany, groupMembers, yearBandWasFormed));
	} catch (err) {
		if ((typeof err === "string") && err.startsWith("VError")) return res.status(400).send(err.substr(1));
		return res.status(500).send("Uh! Oh, something wrong from our side, we will fix it! :)");
	}
});

router.delete("/:id", async (req, res) => {
	try {
		let id = req.params.id;
		validationsForObjectId("id", id, false);

		await remove(id);
		return res.status(200).send({ "bandId": id.trim(), "deleted": true });
	} catch (err) {
		if (err === "VError: Band not found") return res.status(404).send(err.substr(1));

		if ((typeof err === "string") && err.startsWith("VError")) return res.status(400).send(err.substr(1));
		return res.status(500).send("Uh! Oh, something wrong from our side, we will fix it! :)");
	}
});

export default router;
