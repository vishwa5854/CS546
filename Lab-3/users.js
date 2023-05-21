import { userJSONUrl, validationsForStrings, movieJSONUrl, getSomething } from "./helpers.js";

const getUserById = async (id) => {
    validationsForStrings("id", id, false);

    let requiredUser = (await getSomething(userJSONUrl)).find(u => (u.id) && (u.id.trim() === id.trim()));

    if (!requiredUser) throw "user not found";
    return requiredUser;
};

const sameGenre = async (genre) => {
    validationsForStrings("genre", genre, false);
    genre = genre.trim().toLowerCase();

    let users = (await getSomething(userJSONUrl))
                        .filter(u => u.favorite_genre.trim().toLowerCase() === genre)
                        .slice(0, 50)
                        .sort((u, v) => u.last_name.localeCompare(v.last_name))
                        .map(u => `${u.first_name} ${u.last_name}`);
    
    if (users.length < 2) throw `Error: Less than 2 people have the same favorite genre of ${genre}`;
    return users;
};
 
const moviesReviewed = async (id) => {
    let { username } = await getUserById(id); /** Validations should be taken care by this function. */
    
    return (await getSomething(movieJSONUrl))
                            .filter(m => m.reviews && Array.isArray(m.reviews) && m.reviews.find(r => r.username && (r.username === username)))
                            .map(m => { return { [m.title]: m.reviews.find(r => r.username === username) }; });
};

const referMovies = async (id) => {
    let { username, favorite_genre } = await getUserById(id); /** Validations should be taken care by this function. */

    return (await getSomething(movieJSONUrl))
                            .filter(m => m.genre && 
                                    m.genre.split("|").includes(favorite_genre) && m.reviews && Array.isArray(m.reviews) && 
                                    (m.reviews.find(r => r.username && (r.username === username)) === undefined))
                            .map(m => m.title);
};

export { getUserById, sameGenre, moviesReviewed, referMovies };