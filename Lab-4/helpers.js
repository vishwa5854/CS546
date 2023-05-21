import { ObjectId } from "mongodb";

const isJustAString = (e) => (typeof e === "string");

const isJustEmptySpaces = (e) => e.trim().length === 0;

const validationsForStrings = (name, value, allowEmptyStrings = false) => {
    if (!value) throw `Error: ${name} parameter should exist`;

    if (!isJustAString(value)) throw `Error: ${name} parameter should be a string`;

    if (isJustEmptySpaces(value) && !allowEmptyStrings) throw `Error: ${name} parameter cannot be just an empty string or just whitespaces`;
}

const validationsForObjectId = (name, value, allowEmptyStrings = false) => {
    validationsForStrings(name, value, allowEmptyStrings);

    if (!ObjectId.isValid(value.trim())) throw `Error: ${name} is not valid`;
};

const isValidString = (e) => isJustAString(e) && !isJustEmptySpaces(e);

const isNumber = (e) => (typeof e === "number") && (!isNaN(e));

export { isJustAString, isJustEmptySpaces, validationsForStrings, isValidString, isNumber, validationsForObjectId };
