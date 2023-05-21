/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import { 
  isObject, 
  isNotAnEmptyObject, 
  hasOnlyTheseKeys, 
  hasValuesAsStrings, 
  isString, 
  flattenAnArray,
  isNumber,
  isJustAString,
  asciiSort
} from "./helpers.js";

let sortAndFilter = (array, sortBy1, sortBy2, filterBy, filterByTerm) => {
  if (!array) throw "Error: The array - parameter should be a valid value";

  if (!Array.isArray(array)) throw "Error: The array - parameter must be an Array";

  if (array.length <= 0) throw "Error: The array - parameter cannot be empty";

  if (!array.every(isObject)) throw "Error: Each element in the array parameter must be an object";

  if (array.length < 2) throw "Error: At least two objects must be supplied in the array parameter";

  if (!array.every(isNotAnEmptyObject)) throw "Error: Each object in the array parameter cannot be an empty object";

  let keys = Object.keys(array[0]);

  if (!array.every(obj => hasOnlyTheseKeys(keys, obj))) throw "Error: All objects in the array parameter must have all the same keys.";

  if (!array.every(obj => hasValuesAsStrings(keys, obj))) throw "Error: All values for for all keys in each object in the array parameter must be strings (not just empty spaces)";

  if (!sortBy1) throw "Error: sortBy1 parameter should exist";

  if (!Array.isArray(sortBy1)) throw "Error: sortBy1 parameter should be an array";

  if (sortBy1.length !== 2) throw "Error: parameter sortBy1[sortByField1, order] cannot empty and should have two and only two elements";

  if (!sortBy1.every(isString)) throw "Error: Each element in the sortBy1[sortByField1, order] parameter are strings (not just empty spaces)";

  if (!array[0].hasOwnProperty(sortBy1[0])) throw "Error: Passed key should exist in the array of objects.";

  if ((sortBy1[1] !== "asc") && (sortBy1[1] !== "desc")) throw "Error: Order can only be either asc or desc";

  if (!sortBy2) throw "Error: sortBy2 parameter should exist";

  if (!Array.isArray(sortBy2)) throw "Error: sortBy2 parameter should be an array";

  if (sortBy2.length !== 2) throw "Error: parameter sortBy2[sortByField1, order] cannot empty and should have two and only two elements";

  if (!sortBy2.every(isString)) throw "Error: Each element in the sortBy2[sortByField2, order] parameter are strings (not just empty spaces)";

  if (!array[0].hasOwnProperty(sortBy2[0])) throw "Error: Passed key should exist in the array of objects.";

  if ((sortBy2[1] !== "asc") && (sortBy2[1] !== "desc")) throw "Error: Order can only be either asc or desc";

  if (!filterBy) throw "Error: Parameter filterBy cannot be empty";

  if (!filterByTerm) throw "Error: Parameter filterByTerm cannot be empty";

  if (!array[0].hasOwnProperty(filterBy)) throw "Error: Parameter filterBy should exist in the array of objects.";

  if (!isString(filterByTerm)) throw "Error: The filterByTerm must be a string";

  array.sort((a, b) => {
    let secondComparision = ((sortBy2[1] === "asc") ? a[sortBy2[0]].localeCompare(b[sortBy2[0]]) :
                                                      b[sortBy2[0]].localeCompare(a[sortBy2[0]]));
    let comparision = (sortBy1[1] === "asc") ? a[sortBy1[0]].localeCompare(b[sortBy1[0]]) : 
                                              b[sortBy1[0]].localeCompare(a[sortBy1[0]]);
    return (comparision !== 0) ? comparision : secondComparision;
  });

  array = array.filter(obj => obj[filterBy] === filterByTerm);

  if (array.length === 0) throw "Error: Atleast on object should contain the filterByTerm as value.";

  return array;
};

let merge = (...args) => {
  if (!args) throw "Error: Args cannot be empty";

  if (args.length < 1) throw "Error: Atleast one array should be passed";
  
  if (!args.every(Array.isArray)) throw "Error: All the arguments must be arrays";
  let arr = args.reduce((acc, curr) => acc.concat(flattenAnArray(curr)), []);
  return arr.filter(isNumber).sort((a, b) => a - b).concat(arr.filter(isJustAString).sort(asciiSort));
};

let matrixMultiply = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
  if (!args) throw "Error: Args cannot be empty";

  if (args.length < 2) throw "Error: Atleast two inputs should be passed";

  if (!args.every(Array.isArray)) throw "Error: All the arguments must be arrays";

  if (!args.every(arg => arg.length > 0)) throw "Error: Array cannot be empty";

  if (!args.every(arg => arg.every(Array.isArray))) throw "Error: Each array must have only arrays as elemets";

  if (!args.every(arg => arg.every(subArr => subArr.every(isNumber)))) throw "Error: Inner arrays must have only numbers as elements";

  if (!args.every(arg => arg.every(e => e.length === arg[0].length))) throw "Error: Each inner array is of the same length";

  let multiplyTwo = (A, B, r1 = A.length, c1 = A[0].length, r2 = B.length, c2 = B[0].length, res = new Array(r1)) => {
    if (A === "IGNORE") return B;

    if (c1 !== r2) throw "Error: Cannot multiply the given arguments.";

    for (let i = 0; i < r1; i++) {
      res[i] = new Array(c2).fill(0);
      for (let j = 0; j < c2; j++) for (let k = 0; k < r2; k++) res[i][j] += A[i][k] * B[k][j];
    }
      
    return res;
  };

  return args.reduce((acc, curr) => multiplyTwo(acc, curr), "IGNORE");
};


export { sortAndFilter, merge, matrixMultiply };