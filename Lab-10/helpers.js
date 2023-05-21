import { ObjectId } from "mongodb";
import { validationsForStrings } from "./public/js/validators/util.js";

const validationsForObjectId = (name, value, allowEmptyStrings = false) => {
	validationsForStrings(name, value, allowEmptyStrings);

	if (!ObjectId.isValid(value.trim())) throw `VError: ${name} is not valid`;
};

export { validationsForObjectId };
