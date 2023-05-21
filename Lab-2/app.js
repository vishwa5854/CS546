/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

import { merge, sortAndFilter, matrixMultiply } from './arrayUtils.js';
import { palindromes, censorWords, distance } from './stringUtils.js';
import { combineObjects, calculateObject, areObjectsEqual } from './objectUtils.js';

let people = [
    { name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student' },
    { name: 'Matt', age: '21', location: 'New York', role: 'Student' },
    { name: 'Matt', age: '25', location: 'New Jersey', role: 'Student' },
    { name: 'Greg', age: '22', location: 'New York', role: 'Student' },
    { name: 'Mike', age: '21', location: 'Chicago', role: 'Teacher' }];

try {
    console.log(sortAndFilter(people, ['name', 'asc'], ['location', 'asc'], 'role', 'Student'));
    /** Should return
     * [{name: 'Greg', age: '22', location: 'New York', role: 'Student'},
     * {name: 'Matt', age: '25', location: 'New Jersey', role: 'Student'},
     * {name: 'Matt', age: '21', location: 'New York', role: 'Student'},
     * {name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'}] 
     */

} catch (err) {
    console.log(err);
}

try {
    console.log(sortAndFilter(people, ['name', 'asc'], ['location', 'desc'], 'role', 'Student'));
    /** Should return
     * [{name: 'Greg', age: '22', location: 'New York', role: 'Student'},
     * {name: 'Matt', age: '21', location: 'New York', role: 'Student'},
     * {name: 'Matt', age: '25', location: 'New Jersey', role: 'Student'},
     * {name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'}] 
     */

} catch (err) {
    console.log(err);
}

try {
    console.log(sortAndFilter(people, ['location', 'asc'], ['name', 'asc'], 'age', '22'));
    /**  output: 
     * [{name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'}, 
     * {name: 'Greg', age: '22', location: 'New York', role: 'Student'}] 
    */

} catch (err) {
    console.log(err);
}

try {
    console.log(sortAndFilter(undefined, ['location', 'asc'], ['name', 'asc'], 'age', '22'));
    /** Error: The array - parameter should be a valid value */
} catch (err) {
    console.log(err);
}

try {
    console.log(sortAndFilter(null, ['location', 'asc'], ['name', 'asc'], 'age', '22'));
    /** Error: The array - parameter should be a valid value */
} catch (err) {
    console.log(err);
}

try {
    console.log(sortAndFilter(people, ['ssn', 'asc'], ['name', 'asc'], 'age', '22'));
    /* output:
    Error: the sortByField1 is not a key in each object of the array
    */
} catch (err) {
    console.log(err);
}

try {
    console.log(sortAndFilter(people, ['location', 'none'], ['name', 'asc'], 'age', '22'));
    /* output:
    Error: the order of sortByField1 must be either 'asc' or 'desc'
    */
} catch (err) {
    console.log(err);
}

try {
    console.log(sortAndFilter(people, ['location', 'asc'], ['name', 'asc'], 'phone', '22'));
    /* output:
    Error: the filterBy key is not a key in each object of the array
    */
} catch (err) {
    console.log(err);
}

try {
    console.log(sortAndFilter(['location', 'asc'], ['name', 'asc'], 'age', '22'));
    /* output:
    Error: the array does not exist
    */
} catch (err) {
    console.log(err);
}

try {
    console.log(sortAndFilter(['string', {}], ['location', 'asc'], ['name', 'asc'], 'age', '22'));
    /* output:
    Error: each element in the array must be an object
    */
} catch (err) {
    console.log(err);
}

try {
    console.log(sortAndFilter(people, ['location', 'asc'], ['name', 'asc'], 'age', 22));
    /* output:
    Error: the filterByTerm must be a string
    */
} catch (err) {
    console.log(err);
}

try {
    console.log(sortAndFilter([{ name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student' }, { name: 'Greg', age: 22, location: 'New York', role: 'Student' }], 'location', 'age', '22'));
    /* output:
    Error: each value for each key in each object in the array must be a string
    */
} catch (err) {
    console.log(err);
}

/** merge(...args) STARTS */
try {
    console.log(merge([3, 0, 1, 2, 4], [1, 2, 8, 15], [6, 3, 10, 25, 29]));
    // should return [0,1,1,2,2,3,3,4,6,8,10,15,25,29]
} catch (err) {
    console.log(err);
}

try {
    console.log(merge([3, 0, "Lab2", 2, "Aiden"], ["CS-546", "Computer Science", 8, 15], [6, 3, "Patrick", 25, 29]));
    // should return [0,2,3,3,6,8,15,25,29,"Aiden","CS-546","Computer Science", "Lab2", "Patrick"]
} catch (err) {
    console.log(err);
}

try {
    console.log(merge(["bar", 0, 10, 0, 1, [[[5, 6, "foo"]]]], [7, "buzz", ["fizz", 8]]));
    // should return [0, 1, 5, 7, 8, "bar", "buzz", "fizz", "foo"]
} catch (err) {
    console.log(err);
}

try {
    console.log(merge([1, 2, 3], { 1: "a" }));
    // should throw an error for passing the object
} catch (err) {
    console.log(err);
}

try {
    matrixMultiply([[1, 1, 1], [2, 2, 2]], [[3], [2], [1]], [[1]]);
} catch (err) {
    console.log(err);
}

try {
    console.log(matrixMultiply([[2, 3], [3, 4], [4, 5]], [[1, 1, 1], [2, 2, 2]], [[3], [2], [1]])) // would return [ [48], [66], [84] ]
} catch (err) {
    console.log(err);
}

try {
    console.log(matrixMultiply([[3, 5]], [[4], [4]])); //  would return [ [32] ]
} catch (err) {
    console.log(err);
}

try {
    console.log(matrixMultiply([[3, 5]])); //should return an error 
} catch (err) {
    console.log(err);
}

try {
    console.log(matrixMultiply([[3, 5]], [[4], [4], ["Hello"]])); //should return an error 
} catch (err) {
    console.log(err);
}

try {
    console.log(matrixMultiply([[3, 5]], [[4], [4], [NaN]])); //should return an error 
} catch (err) {
    console.log(err);
}

try {
    console.log(matrixMultiply([[3, 5]], [[4], [4], 0])); //should return an error 
} catch (err) {
    console.log(err);
}

try {
    console.log(matrixMultiply([[3, 5]], [])); //should return an error 
} catch (err) {
    console.log(err);
}

try {
    console.log(matrixMultiply([[3, 5]], [["lol"]])); //should return an error 
} catch (err) {
    console.log(err);
}

try {
    console.log(matrixMultiply([[3, 5, 6]], [[1, 2], [3, 4]])); //should return an error 
} catch (err) {
    console.log(err);
}

/** stringUtils.js STARTS */
try {
    console.log((palindromes(["Madam", "Loot", "Was it a cat I saw?", "Poor Dan is in a droop", "Anna", "Nope"])));
    // Returns: {madam: true, loot: false, wasitacatisaw: true, poordanisinadroop: true, anna: true, nope: false}
} catch (err) {
    console.log(err);
}

try {
    console.log(palindromes()); // throws error
} catch (err) {
    console.log(err);
}

try {
    console.log(palindromes("hi")); //  throws error
} catch (err) {
    console.log(err);
}

try {
    console.log(palindromes("    ")); //  throws error
} catch (err) {
    console.log(err);
}

try {
    console.log(palindromes(1));  //throws error
} catch (err) {
    console.log(err);
}

try {
    console.log(palindromes(["abc", 1]));  //throws error
} catch (err) {
    console.log(err);
}

try {
    console.log(palindromes([":-_", "1"]));  //throws error
} catch (err) {
    console.log(err);
}

try {
    console.log(palindromes(["    \t", "1"]))  //throws error
} catch (err) {
    console.log(err);
}

/** stringUtils.censorWords */
try {
    console.log(censorWords("I like bread that has chocolate chips in it but I do not like lollipops", ["bread", "chocolate", "pop"]));
    /*
    output: "I like !@$#! that has @$#!@$#!@ chips in it but I do not like lolli$#!s"
    */
} catch (err) {
    console.log(err);
}

try {
    console.log(censorWords("asd", ["asdfg"]));
    // should return asd
} catch (err) {
    console.log(err);
}

try {
    console.log(censorWords("chocomachochoco cho co", ["choco"]));
    // should return !@$#!macho@$#!@ cho co
} catch (err) {
    console.log(err);
}

try {
    let badWords = ["bread", "chocolate", "pop"];
    console.log(censorWords("     ", badWords));
    // output: Error: input string cannot be an empty string
} catch (err) {
    console.log(err);
}

try {
    console.log(censorWords("I like bread that has chocolate chips in it", [2, "wow"]));
    // output: Error: each element in the bad words list must be a string
} catch (err) {
    console.log(err);
}

/** stringUtils.distance */

try {
    console.log(distance("I like sweet and salty but I like sweet more", "salty", "sweet")) // returns 4
} catch (err) {
    console.log(err);
}

try {
    console.log(distance("I really hope it will snow soon because I like snow", "I", "snow")) // returns 2
} catch (err) {
    console.log(err);
}

try {
    console.log(distance("The brown fox jumped over the lazy dog", "fox", "dog")) // returns 5
} catch (err) {
    console.log(err);
}

try {
    console.log(distance("I was going to buy workout powder yesterday", "going to", "workout powder")) // returns 2
} catch (err) {
    console.log(err);
}

try {
    console.log(distance("sphinx of black quartz, judge my vow", "QUARTZ", "vOW")); // returns 3
} catch (err) {
    console.log(err);
}

try {
    console.log(distance("I was going to buy preworkout powder yesterday", "going to", "workout powder")) // throws error
} catch (err) {
    console.log(err);
}

try {
    console.log(distance("Bob met Adam on wednesday", "Adam", "Bob")) // throws error
} catch (err) {
    console.log(err);
}

try {
    console.log(distance("Give me music suggestions", "rock", "pop")) // throws error
} catch (err) {
    console.log(err);
}

try {
    console.log(distance("Hello there", "hello", "")) // throws error 
} catch (err) {
    console.log(err);
}

try {
    console.log(distance(123, "CS", "Patrick")) // throws error
} catch (err) {
    console.log(err);
}

try {
    console.log(distance("Patrick", "Patrick", "Patrick")) //  throws error
} catch (err) {
    console.log(err);
}

try {
    console.log(distance("Hello World!", "   !?!", "    ...  ")) // throws error
} catch (err) {
    console.log(err);
}

try {
    console.log(distance("", "", "")) // throws error
} catch (err) {
    console.log(err);
}

try {
    console.log(distance([], true)) // throws error
} catch (err) {
    console.log(err);
}

try {
    console.log(distance()) // throws error
} catch (err) {
    console.log(err);
}

/** objectUtils.areObjectsEqual */
const first = { a: 2, b: 3 };
const second = { a: 2, b: 4 };
const third = { a: 2, b: 3 };
const forth = { a: { sA: "Hello", sB: "There", sC: "Class" }, b: 7, c: true, d: "Test" }
const fifth = { c: true, b: 7, d: "Test", a: { sB: "There", sC: "Class", sA: "Hello" } }
const sixth = { name: { firstName: "Patrick", lastName: "Hill" }, age: 47, dob: '9/25/1975', hobbies: ["Playing music", "Movies", "Spending time with family"] }
const seventh = { age: 47, name: { firstName: "Patrick", lastName: "Hill" }, hobbies: ["Playing music", "Movies", "Spending time with family"], dob: '9/25/1975' }
const eighth = { b: 3, a: 2 }

try {
    console.log(areObjectsEqual({}, {}, {}, {}, {})); // true
} catch (err) {
    console.log(err);
}

try {
    console.log(areObjectsEqual()); // throws error
} catch (err) {
    console.log(err);
}

try {
    console.log(areObjectsEqual(undefined, undefined)); // throws error
} catch (err) {
    console.log(err);
}

try {
    console.log(areObjectsEqual(null, null)); // throws error
} catch (err) {
    console.log(err);
}

try {
    console.log(areObjectsEqual([1, 2, 3], [1, 2, 3])); // throws error 
} catch (err) {
    console.log(err);
}

try {
    console.log(areObjectsEqual("foo", "bar")); // throws error
} catch (err) {
    console.log(err);
}

try {
    console.log(areObjectsEqual(first, eighth, third)); // true
} catch (err) {
    console.log(err);
}

try {
    console.log(areObjectsEqual(sixth, seventh)); // true
} catch (err) {
    console.log(err);
}

try {
    console.log(areObjectsEqual(forth, third, sixth)); // false
} catch (err) {
    console.log(err);
}

try {
    console.log(areObjectsEqual(forth, fifth)); // true
} catch (err) {
    console.log(err);
}

/** objectUtils.combineObjects */
try {
    console.log(combineObjects({ a: 3, b: 7, c: 5 },
        { d: 4, e: 9 },
        { a: 8, d: 2 }));
    /* Returns:
{
a: 3,
d: 4
}
*/
} catch (err) {
    console.log(err);
}

try {
    console.log(combineObjects(
        { b: 7, c: 5 },
        { d: 4, e: 9, a: 'waffle' },
        { a: 8, d: 2 },
        { d: 3, e: 'hello' }
    ));
    /* Returns:
    {
        a: 'waffle',
        d: 4,
        e: 9
    }*/
} catch (err) {
    console.log(err);
}

try {
    console.log(combineObjects(
        { apple: 'orange', orange: 'pear' },
        { pear: 'blueberry', fruit: 4 },
        { cool: false, intelligence: -2 }
    )); 
    /* Returns:
        { }
    */
} catch (err) {
    console.log(err);
}

try {
    console.log(combineObjects({ wow: 'crazy', super: 'duper' }, false));
    /* Throws an error */
} catch (err) {
    console.log(err);
}

/** objectUtils.calculateObject */
try {
    console.log(calculateObject({ a: 3, b: 7, c: 5 }, [(n => n * 2), (n => Math.sqrt(n))]));
    // {
    //   a: 2.45,
    //   b: 3.74,
    //   c: 3.16
    // }
} catch (err) {
    console.log(err);
}

try {
    calculateObject({ a: 'Hello', b: 7, c: false }, [(n => n * n)]);
    /* Throws an error */
} catch (err) {
    console.log(err);
}

try {
    calculateObject({ a: 1, b: 2, c: 3 }, [false]);
    /* Throws an error */
} catch (err) {
    console.log(err);
}
