/* Todo: Implment the functions below and then export them
	  using the ES6 exports syntax. 
	  DO NOT CHANGE THE FUNCTION NAMES
*/
import { isObject, isNotAnEmptyObject, isNumber, areTwoEntitiesEqual } from './helpers.js';

let areObjectsEqual = (...args) => {
	if (!args) throw "Error: Args must be passed";

	if (!Array.isArray(args)) throw "Error: args must be more than one";

	if (args.length < 2) throw "Error: Atleast 2 args must be passed";

	if (!args.every(isObject)) throw "Error: All the arguments must be objects";

	for (let i = 1; i < args.length; i++) {
		if (!areTwoEntitiesEqual(args[0], args[i])) return false;
	}
	return true;
};

let calculateObject = (object, funcs) => {
	if (!isObject(object)) throw "Error: object should exist and should be type of object";

	if (!funcs) throw "Error: Funcs should exist";

	if (!Array.isArray(funcs)) throw "Error: Funcs should be a type of array";

	if (!Object.keys(object).every(key => isNumber(object[key]))) throw "Error: All the values in the object must be numbers";

	if (!funcs.length > 1) throw "Error: Funcs should contain atleast one function.";

	if (!funcs.every(func => typeof func === "function")) throw "Error: Funcs can only contain functions";

	let calc = funcs.reduce((acc, curr) => Object.keys(object).reduce((a, c) =>{ return { ...a, [c]: curr(acc[c]) }; }, acc), object);
	return Object.keys(calc).reduce((a, c) => { return { ...a, [c]: Number(calc[c].toFixed(2)) } }, calc);
};

let combineObjects = (...args) => {
	if (!args) throw "Error: combineObjects expects atleast two objects as parameters.";

	if (!Array.isArray(args)) throw "Error: Args should be a type of array";

	if (args.length < 2) throw "Error: Args should have atleast two objects.";

	if (!args.every(arg => isObject(arg) && isNotAnEmptyObject(arg))) throw "Error: Each object in args should be a proper object with atleast one key.";
	let keyMap = {};

	args.forEach(arg => {
		Object.keys(arg).forEach(key => {
			if (!keyMap.hasOwnProperty(key)) {
				keyMap[key] = { count: 0, value: arg[key] };
			}
			keyMap[key].count += 1;
		});
	});

	return Object.keys(keyMap).reduce((acc, curr) => keyMap[curr].count >= 2 ? { ...acc, [curr]: keyMap[curr].value } : acc, {});
};

export { combineObjects, calculateObject, areObjectsEqual };