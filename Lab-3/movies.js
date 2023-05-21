import { validationsForStrings, movieJSONUrl, getSomething, isJustAString } from "./helpers.js";

const findMoviesByDirector = async (directorName) => {
    validationsForStrings("directorName", directorName, false);
    directorName = directorName.trim().toLowerCase();

    let res = (await getSomething(movieJSONUrl)).filter(m => m.director && isJustAString(m.director) && (m.director.trim().toLowerCase() === directorName));

    if ((!res) || (res.length === 0)) throw "Error: Couldn't find any movies with the given director name";
    return res;
};

const findMoviesByCastMember = async (castMemberName) => {
    validationsForStrings("castMemberName", castMemberName, false);
    castMemberName = castMemberName.trim().toLowerCase();

    let res = (await getSomething(movieJSONUrl)).filter(m => m.cast && Array.isArray(m.cast) && m.cast.find(c => (c.trim().toLowerCase() === castMemberName)));

    if ((!res) || (res.length === 0)) throw "Error: Couldn't find any movies with the given director name";
    return res;
};

const getOverallRating = async (title) => {
    validationsForStrings("title", title, false);
    title = title.trim().toLowerCase();

    let res = (await getSomething(movieJSONUrl))
                        .find(m => m.title && isJustAString(m.title) && (m.title.trim().toLowerCase() === title));
    
    if ((!res) || (res.length === 0)) throw "Error: Movie not found";
    let ans = 0;
    
    if(res.reviews && Array.isArray(res.reviews)) ans = (res.reviews.reduce((a, c) => c.rating ? a + Number(c.rating) : a, 0)) / res.reviews.length;
    return Math.floor(ans * 10) / 10;
};

const getMovieById = async (id) => {
    validationsForStrings("id", id, false);

    let res = (await getSomething(movieJSONUrl)).find(u => (u.id) && (u.id.trim() === id.trim()));

    if (!res) throw "movie not found";
    return res;
};

export { findMoviesByDirector, findMoviesByCastMember, getMovieById, getOverallRating };