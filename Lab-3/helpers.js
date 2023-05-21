import axios from "axios";

const userJSONUrl = "https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json";
const movieJSONUrl = "https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json";

const getSomething = async (url) => (await axios.get(url)).data;

const isJustAString = (e) => (typeof e === "string");

const isJustEmptySpaces = (e) => e.trim().length === 0;

const validationsForStrings = (name, value, allowEmptyStrings = false) => {
    if (!value) throw `Error: ${name} parameter should exist`;

    if (!isJustAString(value)) throw `Error: ${name} parameter should be a string`;

    if (isJustEmptySpaces(value) && !allowEmptyStrings) throw `Error: ${name} parameter cannot be just an empty string or just whitespaces`;
}

export { getSomething, isJustAString, isJustEmptySpaces, userJSONUrl, validationsForStrings, movieJSONUrl };
