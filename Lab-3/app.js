/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import * as movies from "./movies.js");

async function main(){
    try{
        const moviedata = await movies.getMovies();
        console.log (movieata);
    }catch(e){
        console.log (e);
    }
}

call main
main();
*/

import { getUserById, sameGenre, moviesReviewed, referMovies } from "./users.js";
import { findMoviesByDirector, findMoviesByCastMember, getOverallRating, getMovieById } from "./movies.js";

let testGetUserById = async () => {
    let line = 1;
    console.log("**********************************");
    console.log("****START OF GET USER BY ID*******");
    console.log("**********************************");

    let log = (string) => {
        process.stdout.write(`${line++}: `);
        console.log(string);
    };

    try {
        let something = await getUserById(12);
        log(something);
        // should throw an error
    } catch (err) {
        log(err);
    }

    try {
        let something = await getUserById("e3c9ecf8-954e-408d-9fe7-148453115891");
        log(something);
        // should return the user object
    } catch (err) {
        log(err);
    }

    try {
        let something = await getUserById("   e3c9ecf8-954e-408d-9fe7-148453115891");
        log(something);
        // should return the user object
    } catch (err) {
        log(err);
    }

    try {
        let something = await getUserById("48fded55-37cd-4e6b-8f19-e78b481a14a4");
        log(something);
        // Returns:
        // { id: "48fded55-37cd-4e6b-8f19-e78b481a14a4", username: "abrett0", password: "YQ8Jpot33Mf", first_name: "Abigail", last_name: "Brett", email: "abrett0@gizmodo.com", favorite_genre: "Fantasy" }
    } catch (err) {
        log(err);
    }

    try {
        log("Should trim the given input string and then return the result");
        let something = await getUserById("   48fded55-37cd-4e6b-8f19-e78b481a14a4  ");
        log(something);
        // Returns:
        // { id: "48fded55-37cd-4e6b-8f19-e78b481a14a4", username: "abrett0", password: "YQ8Jpot33Mf", first_name: "Abigail", last_name: "Brett", email: "abrett0@gizmodo.com", favorite_genre: "Fantasy" }
    } catch (err) {
        log(err);
    }

    try {
        let something = await getUserById(-1); // Throws Error
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getUserById(1001); // Throws Error
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getUserById(); // Throws Error
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getUserById("   "); // Throws Error
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getUserById(null); // Throws Error
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getUserById(undefined); // Throws Error
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getUserById(() => { }); // Throws Error
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getUserById('7989fa5e-5617-43f7-a931-46036f9dbcff'); // Throws user not found Error
        log(something);
    } catch (err) {
        log(err);
    }

    console.log("**********************************");
    console.log("******END OF GET USER BY ID*******");
    console.log("**********************************");
}

let testSameGenre = async () => {
    let line = 1;
    console.log("\n********************************");
    console.log("********START OF SAME GENRE*******");
    console.log("**********************************");

    let log = (string) => {
        process.stdout.write(`${line++}: `);
        console.log(string);
    };

    try {
        let something = await sameGenre("Action");
        // \\ Returns:
        // ['Shay Claydon', 'Merridie Confort', 'Bent Crowest', 'Shurlocke Cull', 'Lonny Dechelle', 'Olia Shefton']
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await sameGenre("DrAma");
        // \\ Returns:
        // ['Shay Claydon', 'Merridie Confort', 'Bent Crowest', 'Shurlocke Cull', 'Lonny Dechelle', 'Olia Shefton']
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        log("FANTASY");
        let something = await sameGenre("fantasy");
        // returns [
        //     'Abigail Brett',     'Shanie Burle',
        //     'Aaren Butters',     'Rourke Edelheit',
        //     'Charmaine Emps',    'Nehemiah Filippello',
        //     'Silvano Gianilli',  'Amandi Kopacek',
        //     'Kamilah Longfield', 'Sylvan Maydwell',
        //     'Hildegarde Mordie', 'Shea Muress',
        //     'Marcela Okenfold',  'Raddie Pantling',
        //     'Stillman Pegler',   'Barty Primarolo',
        //     'Alessandra Smails', 'Maxine Spurdle',
        //     'Jacob Sweetsur',    'Tomkin Tchir',
        //     'Drusie Woodnutt'
        //   ]
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        log("Should trim the string and return the same result");
        let something = await sameGenre("   Action   ");
        // \\ Returns:
        // ['Shay Claydon', 'Merridie Confort', 'Bent Crowest', 'Shurlocke Cull', 'Lonny Dechelle', 'Olia Shefton']
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await sameGenre(); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        log("Just Empty Spaces");
        let something = await sameGenre("    "); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await sameGenre(undefined); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await sameGenre(null); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await sameGenre(123); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await sameGenre(["123"]); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await sameGenre(true); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await sameGenre(() => { }); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await sameGenre({ a: "hello JS!" }); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await sameGenre("IMAX"); //Throws Error since only one person has it as favorite;
        log(something);
    } catch (err) {
        log(err);
    }

    console.log("**********************************");
    console.log("******END OF SAME GENRE***********");
    console.log("**********************************");
}

let testMoviesReviewed = async () => {
    let line = 1;
    console.log("\n********************************");
    console.log("****START OF MOVIES REVIEWED******");
    console.log("**********************************");

    let log = (string) => {
        process.stdout.write(`${line++}: `);
        console.log(string);
    };

    try {
        log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
        log((await moviesReviewed("9e0f0b6c-cd17-46ab-9066-d522198a33c0")));
        // should throw user not found
    } catch (err) {
        log(err);
    }

    try {
        log((await moviesReviewed('64035fad-a5b7-48c9-9317-3e31e22fe26c')));
        // Returns:
        // [{'Charlie's Angels': {username:"cfinkle5",rating:4,review:"Solid, good movie."} }, 
        // {'Class of 1999 II: The Substitute': {username:"cfinkle5",rating:4,review:"Solid, good movie."} }, 
        // {'Terminator 3: Rise of the Machines': {username:"cfinkle5",rating:2,review:"It was meh, plot was very bad."} }]
    } catch (err) {
        log(err);
    }

    try {
        log((await moviesReviewed('64035fad-a5b7-48c9-9317-3e31e21fe26c')));
        // should throw user not found
    } catch (err) {
        log(err);
    }

    try {
        log((await moviesReviewed('something')));
        // should throw user not found
    } catch (err) {
        log(err);
    }

    try {
        log((await moviesReviewed(undefined)));
        // should throw user 
    } catch (err) {
        log(err);
    }

    try {
        log((await moviesReviewed(null)));
        // should throw user 
    } catch (err) {
        log(err);
    }

    try {
        log((await moviesReviewed(() => { })));
        // should throw user 
    } catch (err) {
        log(err);
    }

    try {
        log((await moviesReviewed(true)));
        // should throw user 
    } catch (err) {
        log(err);
    }

    try {
        log((await moviesReviewed("   ")));
        // should throw user 
    } catch (err) {
        log(err);
    }

    console.log("**********************************");
    console.log("******END OF MOVIES REVIEWED******");
    console.log("**********************************");
};

let testReferMovies = async () => {
    let line = 1;
    console.log("\n********************************");
    console.log("****START OF REFER MOVIES*********");
    console.log("**********************************");

    let log = (string) => {
        process.stdout.write(`${line++}: `);
        console.log(string);
    };

    try {
        log(await referMovies("03cff5e0-61e4-449f-8591-ddbb58aa2ca7"));
    } catch (err) {
        log(err);
    }

    try {
        log(await referMovies('5060fc9e-10c7-4f38-9f3d-47b7f477568b'));
        // Returns: ['Fly Me to the Moon', 'Gravity', 'Spiderwick Chronicles, The', 'How to Train Your Dragon', 'Wings of Courage', 'Happy Feet Two']
    } catch (err) {
        log(err);
    }

    try {
        log(((await referMovies("31d5daa8-28f6-49f2-9d03-a09c86a5ea1c"))).length); // return something
    } catch (err) {
        log(err);
    }

    try {
        log(await referMovies(-1)); // Throws Error
    } catch (err) {
        log(err);
    }

    try {
        log(await referMovies('7989fa5e-5617-43f7-a931-46036f9dbcff')); // Throws user not found Error
    } catch (err) {
        log(err);
    }

    try {
        log((await referMovies('64035fad-a5b7-48c9-9317-3e31e21fe26c')));
        // should throw user not found
    } catch (err) {
        log(err);
    }

    try {
        log((await referMovies('something')));
        // should throw user not found
    } catch (err) {
        log(err);
    }

    try {
        log((await referMovies(undefined)));
        // should throw error 
    } catch (err) {
        log(err);
    }

    try {
        log((await referMovies(null)));
        // should throw error 
    } catch (err) {
        log(err);
    }

    try {
        log((await referMovies(() => { })));
        // should throw error 
    } catch (err) {
        log(err);
    }

    try {
        log((await referMovies(true)));
        // should throw error 
    } catch (err) {
        log(err);
    }

    try {
        log((await referMovies("   ")));
        // should throw error 
    } catch (err) {
        log(err);
    }

    console.log("**********************************");
    console.log("******END OF REFER MOVIES*********");
    console.log("**********************************");
};

let testFindMoviesByDirector = async () => {
    let line = 1;
    console.log("\n********************************");
    console.log("****FIND MOVIES BY DIRECTOR*******");
    console.log("**********************************");

    let log = (string) => {
        process.stdout.write(`${line++}: `);
        console.log(string);
    };

    try {
        log((await findMoviesByDirector("Fernando Dollimore")));
        // should return this
        // [
        //     {
        //         id: '040d7398-136c-45f0-89b8-9b73c67c617e',
        //         title: 'Company',
        //         genre: 'Drama|Musical',
        //         director: 'Fernando Dollimore',
        //         release_date: '10/27/2020',
        //         runtime: '1h 14mins',
        //         mpa_rating: 'PG-13',
        //         cast: ['Huberto Snoddon', 'Horacio Scoggins'],
        //         streaming_service: {
        //             company: 'Netflix',
        //             link: 'https://Netflix.com/Company'
        //         },
        //         reviews: [
        //             {
        //                 username: 'jsorrelaw',
        //                 rating: 2,
        //                 review: 'It was meh, plot was very bad.'
        //             },
        //             { username: 'sgiacobo1n', rating: 3, review: 'A very ok movie.' },
        //             { username: 'egrigolieb', rating: 3, review: 'A very ok movie.' },
        //             { username: 'lmcinnesmk', rating: 4, review: 'Solid, good movie.' }
        //         ]
        //     },
        //     {
        //         id: 'e8b006a5-8a81-4718-ae52-11b2bd02f741',
        //         title: 'Flashbacks of a Fool',
        //         genre: 'Drama',
        //         director: 'Fernando Dollimore',
        //         release_date: '07/15/2010',
        //         runtime: '2h 58mins',
        //         mpa_rating: 'PG',
        //         cast: [
        //             'Iver Hubbucks',
        //             'Tandi Arminger',
        //             'Willette Furze',
        //             'Feliks Edowes',
        //             'Neddie Ashleigh'
        //         ],
        //         streaming_service: {
        //             company: 'Paramount+',
        //             link: 'https://Paramount+.com/Flashbacks of a Fool'
        //         },
        //         reviews: [
        //             {
        //                 username: 'tjoice3z',
        //                 rating: 2,
        //                 review: 'It was meh, plot was very bad.'
        //             },
        //             {
        //                 username: 'lhumpherstonjo',
        //                 rating: 2,
        //                 review: 'It was meh, plot was very bad.'
        //             },
        //             { username: 'sgiacobo1n', rating: 1, review: 'HORRIBLE MOVIE!!!' },
        //             { username: 'kcoumbe9m', rating: 3, review: 'A very ok movie.' }
        //         ]
        //     },
        //     {
        //         id: 'f77972aa-9fdf-4465-9948-ba4acfea4d16',
        //         title: 'Last Time, The',
        //         genre: 'Comedy|Drama|Romance',
        //         director: 'Fernando Dollimore',
        //         release_date: '05/24/2013',
        //         runtime: '3h 32mins',
        //         mpa_rating: 'R',
        //         cast: ['Isaiah Gabbett', 'Merrili Maud', 'Raynard Tuxsell'],
        //         streaming_service: {
        //             company: 'Peacock',
        //             link: 'https://Peacock.com/Last Time, The'
        //         },
        //         reviews: [
        //             {
        //                 username: 'lbickelll',
        //                 rating: 2,
        //                 review: 'It was meh, plot was very bad.'
        //             },
        //             {
        //                 username: 'abuttersm2',
        //                 rating: 5,
        //                 review: 'OMG I loved it. AMAZING 10/10!!!!'
        //             }
        //         ]
        //     },
        //     {
        //         id: 'bcafe739-d928-4440-b3a9-4cc554a1cb2a',
        //         title: 'Rambo III',
        //         genre: 'Action|Adventure|Thriller|War',
        //         director: 'Fernando Dollimore',
        //         release_date: '02/11/2020',
        //         runtime: '1h 16mins',
        //         mpa_rating: 'R',
        //         cast: ['Meier Craine', 'Lorrie Yanin', 'Nertie Kadar', 'Pattie Caffin'],
        //         streaming_service: {
        //             company: 'HBO Max',
        //             link: 'https://HBO Max.com/Rambo III'
        //         },
        //         reviews: [
        //             {
        //                 username: 'jjackettcr',
        //                 rating: 5,
        //                 review: 'OMG I loved it. AMAZING 10/10!!!!'
        //             },
        //             {
        //                 username: 'bboziermu',
        //                 rating: 2,
        //                 review: 'It was meh, plot was very bad.'
        //             },
        //             {
        //                 username: 'apergensrj',
        //                 rating: 2,
        //                 review: 'It was meh, plot was very bad.'
        //             },
        //             { username: 'cempsbj', rating: 4, review: 'Solid, good movie.' }
        //         ]
        //     }
        // ];
    } catch (err) {
        log(err);
    }

    try {
        log("Should return the same even if we give trailing spaces");
        log((await findMoviesByDirector("   Fernando Dollimore ")));
        // should return this
        // [
        //     {
        //         id: '040d7398-136c-45f0-89b8-9b73c67c617e',
        //         title: 'Company',
        //         genre: 'Drama|Musical',
        //         director: 'Fernando Dollimore',
        //         release_date: '10/27/2020',
        //         runtime: '1h 14mins',
        //         mpa_rating: 'PG-13',
        //         cast: ['Huberto Snoddon', 'Horacio Scoggins'],
        //         streaming_service: {
        //             company: 'Netflix',
        //             link: 'https://Netflix.com/Company'
        //         },
        //         reviews: [
        //             {
        //                 username: 'jsorrelaw',
        //                 rating: 2,
        //                 review: 'It was meh, plot was very bad.'
        //             },
        //             { username: 'sgiacobo1n', rating: 3, review: 'A very ok movie.' },
        //             { username: 'egrigolieb', rating: 3, review: 'A very ok movie.' },
        //             { username: 'lmcinnesmk', rating: 4, review: 'Solid, good movie.' }
        //         ]
        //     },
        //     {
        //         id: 'e8b006a5-8a81-4718-ae52-11b2bd02f741',
        //         title: 'Flashbacks of a Fool',
        //         genre: 'Drama',
        //         director: 'Fernando Dollimore',
        //         release_date: '07/15/2010',
        //         runtime: '2h 58mins',
        //         mpa_rating: 'PG',
        //         cast: [
        //             'Iver Hubbucks',
        //             'Tandi Arminger',
        //             'Willette Furze',
        //             'Feliks Edowes',
        //             'Neddie Ashleigh'
        //         ],
        //         streaming_service: {
        //             company: 'Paramount+',
        //             link: 'https://Paramount+.com/Flashbacks of a Fool'
        //         },
        //         reviews: [
        //             {
        //                 username: 'tjoice3z',
        //                 rating: 2,
        //                 review: 'It was meh, plot was very bad.'
        //             },
        //             {
        //                 username: 'lhumpherstonjo',
        //                 rating: 2,
        //                 review: 'It was meh, plot was very bad.'
        //             },
        //             { username: 'sgiacobo1n', rating: 1, review: 'HORRIBLE MOVIE!!!' },
        //             { username: 'kcoumbe9m', rating: 3, review: 'A very ok movie.' }
        //         ]
        //     },
        //     {
        //         id: 'f77972aa-9fdf-4465-9948-ba4acfea4d16',
        //         title: 'Last Time, The',
        //         genre: 'Comedy|Drama|Romance',
        //         director: 'Fernando Dollimore',
        //         release_date: '05/24/2013',
        //         runtime: '3h 32mins',
        //         mpa_rating: 'R',
        //         cast: ['Isaiah Gabbett', 'Merrili Maud', 'Raynard Tuxsell'],
        //         streaming_service: {
        //             company: 'Peacock',
        //             link: 'https://Peacock.com/Last Time, The'
        //         },
        //         reviews: [
        //             {
        //                 username: 'lbickelll',
        //                 rating: 2,
        //                 review: 'It was meh, plot was very bad.'
        //             },
        //             {
        //                 username: 'abuttersm2',
        //                 rating: 5,
        //                 review: 'OMG I loved it. AMAZING 10/10!!!!'
        //             }
        //         ]
        //     },
        //     {
        //         id: 'bcafe739-d928-4440-b3a9-4cc554a1cb2a',
        //         title: 'Rambo III',
        //         genre: 'Action|Adventure|Thriller|War',
        //         director: 'Fernando Dollimore',
        //         release_date: '02/11/2020',
        //         runtime: '1h 16mins',
        //         mpa_rating: 'R',
        //         cast: ['Meier Craine', 'Lorrie Yanin', 'Nertie Kadar', 'Pattie Caffin'],
        //         streaming_service: {
        //             company: 'HBO Max',
        //             link: 'https://HBO Max.com/Rambo III'
        //         },
        //         reviews: [
        //             {
        //                 username: 'jjackettcr',
        //                 rating: 5,
        //                 review: 'OMG I loved it. AMAZING 10/10!!!!'
        //             },
        //             {
        //                 username: 'bboziermu',
        //                 rating: 2,
        //                 review: 'It was meh, plot was very bad.'
        //             },
        //             {
        //                 username: 'apergensrj',
        //                 rating: 2,
        //                 review: 'It was meh, plot was very bad.'
        //             },
        //             { username: 'cempsbj', rating: 4, review: 'Solid, good movie.' }
        //         ]
        //     }
        // ];
    } catch (err) {
        log(err);
    }

    log("pppppppppp viki")
    
    try {
        log((await findMoviesByDirector("  VIki SimonS  ")));
        // should throw error 
    } catch (err) {
        log(err);
    }
    try {
        log((await findMoviesByDirector("Patrick Hill")));
        // should throw an error since no movies are found
    } catch (err) {
        log(err);
    }

    try {
        let something = await findMoviesByDirector(); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        log("Just Empty Spaces");
        let something = await findMoviesByDirector("    "); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await findMoviesByDirector(undefined); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await findMoviesByDirector(null); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await findMoviesByDirector(123); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await findMoviesByDirector(["123"]); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await findMoviesByDirector(true); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await findMoviesByDirector(() => { }); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await findMoviesByDirector({ a: "hello JS!" }); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    console.log("**********************************");
    console.log("****END OF MOVIES BY DIRECTOR*****");
    console.log("**********************************");
}

let testFindMoviesByCastMember = async () => {
    let line = 1;
    console.log("\n********************************");
    console.log("****FIND MOVIES BY CAST MEMBER****");
    console.log("**********************************");

    let log = (string) => {
        process.stdout.write(`${line++}: `);
        console.log(string);
    };

    try {
        log((await findMoviesByCastMember(" Wright Mitchinson")));
    } catch (err) {
        log(err);
    }

    try {
        log((await findMoviesByCastMember("Huberto Snoddon")));
        // returns [
        //   {
        //     id: '040d7398-136c-45f0-89b8-9b73c67c617e',
        //     title: 'Company',
        //     genre: 'Drama|Musical',
        //     director: 'Fernando Dollimore',
        //     release_date: '10/27/2020',
        //     runtime: '1h 14mins',
        //     mpa_rating: 'PG-13',
        //     cast: ['Huberto Snoddon', 'Horacio Scoggins'],
        //     streaming_service: {
        //       company: 'Netflix',
        //       link: 'https://Netflix.com/Company'
        //     },
        //     reviews: [
        //       {
        //         username: 'jsorrelaw',
        //         rating: 2,
        //         review: 'It was meh, plot was very bad.'
        //       },
        //       {username: 'sgiacobo1n', rating: 3, review: 'A very ok movie.'},
        //       {username: 'egrigolieb', rating: 3, review: 'A very ok movie.'},
        //       {username: 'lmcinnesmk', rating: 4, review: 'Solid, good movie.'}
        //     ]
        //   },
        //   {
        //     id: 'ab000bf0-f2e5-4cda-9294-e588a734f0ef',
        //     title: "Herod's Law (Ley de Herodes, La)",
        //     genre: 'Comedy|Crime|Mystery',
        //     director: 'Lise Glanister',
        //     release_date: '06/13/2003',
        //     runtime: '1h 57mins',
        //     mpa_rating: 'NC-17',
        //     cast: ['Huberto Snoddon', 'Mickie Rankine'],
        //     streaming_service: {
        //       company: 'Amazon Prime Video',
        //       link: "https://Amazon Prime Video.com/Herod's Law (Ley de Herodes, La)"
        //     },
        //     reviews: [{username: 'iaistonli', rating: 1, review: 'HORRIBLE MOVIE!!!'}]
        //   }
        // ];
    } catch (err) {
        log(err);
    }

    try {
        log((await findMoviesByCastMember("   Huberto Snoddon")));
        // returns [
        //   {
        //     id: '040d7398-136c-45f0-89b8-9b73c67c617e',
        //     title: 'Company',
        //     genre: 'Drama|Musical',
        //     director: 'Fernando Dollimore',
        //     release_date: '10/27/2020',
        //     runtime: '1h 14mins',
        //     mpa_rating: 'PG-13',
        //     cast: ['Huberto Snoddon', 'Horacio Scoggins'],
        //     streaming_service: {
        //       company: 'Netflix',
        //       link: 'https://Netflix.com/Company'
        //     },
        //     reviews: [
        //       {
        //         username: 'jsorrelaw',
        //         rating: 2,
        //         review: 'It was meh, plot was very bad.'
        //       },
        //       {username: 'sgiacobo1n', rating: 3, review: 'A very ok movie.'},
        //       {username: 'egrigolieb', rating: 3, review: 'A very ok movie.'},
        //       {username: 'lmcinnesmk', rating: 4, review: 'Solid, good movie.'}
        //     ]
        //   },
        //   {
        //     id: 'ab000bf0-f2e5-4cda-9294-e588a734f0ef',
        //     title: "Herod's Law (Ley de Herodes, La)",
        //     genre: 'Comedy|Crime|Mystery',
        //     director: 'Lise Glanister',
        //     release_date: '06/13/2003',
        //     runtime: '1h 57mins',
        //     mpa_rating: 'NC-17',
        //     cast: ['Huberto Snoddon', 'Mickie Rankine'],
        //     streaming_service: {
        //       company: 'Amazon Prime Video',
        //       link: "https://Amazon Prime Video.com/Herod's Law (Ley de Herodes, La)"
        //     },
        //     reviews: [{username: 'iaistonli', rating: 1, review: 'HORRIBLE MOVIE!!!'}]
        //   }
        // ];
    } catch (err) {
        log(err);
    }
    
    try {
        log((await findMoviesByCastMember("Zollie Bruna")));
        // should return five objects
    } catch (err) {
        log(err);
    }

    try {
        log((await findMoviesByCastMember("Patrick Hill")));
        // should throw an error since no movies are found
    } catch (err) {
        log(err);
    }

    try {
        let something = await findMoviesByCastMember(); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        log("Just Empty Spaces");
        let something = await findMoviesByCastMember("    "); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await findMoviesByCastMember(undefined); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await findMoviesByCastMember(null); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await findMoviesByCastMember(123); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await findMoviesByCastMember(["123"]); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await findMoviesByCastMember(true); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await findMoviesByCastMember(() => { }); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await findMoviesByCastMember({ a: "hello JS!" }); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    console.log("**********************************");
    console.log("*END OF FIND MOVIES BY CAST MEMBER");
    console.log("**********************************");
};


let testGetOverallRating = async () => {
    let line = 1;
    console.log("\n*********************************");
    console.log("*********GET OVERALL RATING*******");
    console.log("**********************************");

    let log = (string) => {
        process.stdout.write(`${line++}: `);
        console.log(string);
    };

    try {
        log((await getOverallRating("Asterix and the Vikings (Astérix et les Vikings)"))); // should return 2.2
    } catch (err) {
        log(err);
    }

    try {
        log((await getOverallRating("Patrick Hill"))); // should throw movie not found
    } catch (err) {
        log(err);
    }

    try {
        log((await getOverallRating("Asterix and the Vikings (Astérix et les Vikings)        "))); // should return 2.2
    } catch (err) {
        log(err);
    }

    try {
        log((await getOverallRating("        "))); // should throw an error
    } catch (err) {
        log(err);
    }

    try {
        log((await getOverallRating("Almost an Angel"))); // should return 2
    } catch (err) {
        log(err);
    }

    try {
        log((await getOverallRating("Five Dedicated to Ozu"))); // should return 3
    } catch (err) {
        log(err);
    }

    try {
        log((await getOverallRating("loudQUIETloud: A Film About the Pixies"))); // should return 4
    } catch (err) {
        log(err);
    }

    try {
        log((await getOverallRating("iNk "))); // should return 4
    } catch (err) {
        log(err);
    }

    try {
        log((await getOverallRating("iNk asd"))); // should return 4
    } catch (err) {
        log(err);
    }

    try {
        let something = await getOverallRating(); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        log("Just Empty Spaces");
        let something = await getOverallRating("    "); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getOverallRating(undefined); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getOverallRating(null); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getOverallRating(123); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getOverallRating(["123"]); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getOverallRating(true); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getOverallRating(() => { }); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getOverallRating({ a: "hello JS!" }); //Throws Error;
        log(something);
    } catch (err) {
        log(err);
    }

    console.log("**********************************");
    console.log("****END OF GET OVERALL RATING*****");
    console.log("**********************************");
};

let testGetMovieById = async () => {
    let line = 1;
    console.log("**********************************");
    console.log("****START OF GET MOVIE BY ID*******");
    console.log("***********************************");

    let log = (string) => {
        process.stdout.write(`${line++}: `);
        console.log(string);
    };

    try {
        let something = await getMovieById(12);
        log(something);
        // should throw an error
    } catch (err) {
        log(err);
    }

    try {
        let something = await getMovieById("38fd6885-0271-4650-8afd-6d09f3a890a2");
        log(something);
        // should return the movie object
    } catch (err) {
        log(err);
    }

    try {
        let something = await getMovieById("   38fd6885-0271-4650-8afd-6d09f3a890a2 ");
        log(something);
        // should return the movie object
    } catch (err) {
        log(err);
    }

    try {
        log("Should trim the given input string and then return the result");
        let something = await getMovieById("   48fded55-37cd-4e6b-8f19-e78b481a14a4  ");
        log(something); // should throw movie not found
    } catch (err) {
        log(err);
    }

    try {
        let something = await getMovieById(-1); // Throws Error
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getMovieById(1001); // Throws Error
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getMovieById(); // Throws Error
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getMovieById("   "); // Throws Error
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getMovieById(null); // Throws Error
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getMovieById(undefined); // Throws Error
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getMovieById(() => { }); // Throws Error
        log(something);
    } catch (err) {
        log(err);
    }

    try {
        let something = await getMovieById('7989fa5e-5617-43f7-a931-46036f9dbcff'); // Throws movie not found Error
        log(something);
    } catch (err) {
        log(err);
    }

    console.log("**********************************");
    console.log("******END OF GET USER BY ID*******");
    console.log("**********************************");
}

let main = async () => {
    await testGetUserById();
    await testSameGenre();
    await testMoviesReviewed();
    await testReferMovies();
    await testFindMoviesByDirector();
    await testFindMoviesByCastMember();
    await testGetOverallRating();
    await testGetOverallRating();
    await testGetMovieById();
}

main();
