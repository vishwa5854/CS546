//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

/*
import the router and create the follow routes using the GET http method

'/aboutme';
'/mystory';
'/educationhistory'


export the router */

import { Router } from "express";

const router = Router();

router.get("/aboutme", async (req, res) => {
    return res.send({
        "firstName": "Kashi Vishwanath",
        "lastName": "Bondugula",
        "biography": "I am a tech enthusiast\n I love building tech\n I am a full stack dev",
        "favoriteMovies": ["Inception", "Wolf of wall street", "Tokyo Drift"],
        "hobbies": ["Motorcycling", "building fun projects", "Netflix and chilling on the couch"],
        "fondestMemory": "When I bought my first laptop which was indeed a gaming laptop, with my own hard working money made from tutoring kids"
    });
});

router.get("/mystory", async (req, res) => {
    return res.send({
        "storyTitle": "Time Travel",
        "storyGenre": "Science",
        "story": "Do you know we have already cracked time travel?\n If we would want to travel into future all we have to do is go into space far away from earth say till Jupyter and then spend like 2 years over there and come back, you fill find that all of your peers and friends would have aged 10years older, but you have aged only 2 years.\n This phenomenon is called as time dilation and this can be explained with the help of theory of relativity by Albert Einstein.\n We can travel into past by just travelling faster than light which will show you the past since the new light hasn't reached that place yet.\n But in reality there is no such element with that much strength with which we could build a machine to travel at the speed of light."
    });
});

router.get("/educationhistory", async (req, res) => {
    return res.send([{
        "schoolName": "Vidya Vardhini High School",
        "degreeEarned": "Elementary School",
        "numberOfYearsAttended": 5,
        "favoriteClasses": ["rhymes", "english", "nap time", "games"],
        "favoriteSchoolMemory": "Rhyming random things in between when everyone is singing a song in the morning prayer"
    }, {
        "schoolName": "Rao School",
        "degreeEarned": "Middle School Degree",
        "numberOfYearsAttended": 3,
        "favoriteClasses": ["Science", "Mathematics", "Literature", "Sports"],
        "favoriteSchoolMemory": "This was the first time ever in my life I have written a computer program using Q-basic which felt like hacking nasa lol :)"
    }, {
        "schoolName": "Chaitanya High School",
        "degreeEarned": "H.S. Diploma",
        "numberOfYearsAttended": 5,
        "favoriteClasses": ["Literature", "Mathematics", "Computer Fudamentals", "Physics"],
        "favoriteSchoolMemory": "I was the best student of the school, got nominated unanimously for the School President, ran my own club, I miss all of that :("
    }, {
        "schoolName": "Sreenidhi Institute of Science and Technology",
        "degreeEarned": "Bachelor's Degree",
        "numberOfYearsAttended": 4,
        "favoriteClasses": ["Operating Systems", "Java", "Python", "Computer Networks"],
        "favoriteSchoolMemory": "Well this is the time I have fallen in love and had one of the best days of my life"
    }, {
        "schoolName": "Stevens Institute of Technology",
        "degreeEarned": "Masters Degree",
        "numberOfYearsAttended": 2,
        "favoriteClasses": ["Advanced programming in Unix Environment CS631", "Enterprise Software Architecture and Design CS548", "Machine Learning CS559", "Databases CS561"],
        "favoriteSchoolMemory": "I am still pursuing my masters and I don't have a favorite memory yet."
    }]);
});

export default router;