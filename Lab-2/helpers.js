/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/

const isObject = (obj) => (typeof obj === "object") && (obj !== null) && (obj !== undefined) && !Array.isArray(obj);

const isNotAnEmptyObject = (obj) => Object.keys(obj).length > 0;

const hasOnlyTheseKeys = (keys, obj) => (Object.keys(obj).length === keys.length) &&
    (keys.every(key => obj.hasOwnProperty(key)));

const isString = (str) => (typeof str === 'string') && (str.trim().length > 0);

const hasValuesAsStrings = (keys, obj) => keys.every(key => isString(obj[key]));

const flattenAnArray = (arr, res = []) => {
    arr.forEach(a => Array.isArray(a) ? res = res.concat(flattenAnArray(a)) : res.push(a));
    return res;
};

const isNumber = (e) => (typeof e === "number") && (!isNaN(e));

const isJustAString = (e) => (typeof e === "string");

const isAlphaNumeric = (e, ascii = e.charCodeAt(0)) => (ascii > 47 && ascii < 58) || (ascii > 64 && ascii < 91) || (ascii > 96 && ascii < 123);

const findAllIndexes = (o, t) => [...o.matchAll(new RegExp(t, 'gi'))].map(a => a.index);

const findAllIndexesInArray = (arr, t) => arr.map((a, idx) => a === t ? idx : -1).filter(a => a !== -1);

const areTwoEntitiesEqual = (e1, e2) => {
    let tE1 = typeof e1;
    let tE2 = typeof e2;
    if (tE1 !== tE2) return false;

    if ((tE1 !== "object") && (!Array.isArray(e1)) && tE1 !== "function") return e1 === e2;

    if (tE1 === "function") e1.toString() === e2.toString();


    /** According to this page I got to know that these are all the possible objects
     * https://www.w3schools.com/js/js_object_definition.asp
     */
    if (e1 instanceof Date && e2 instanceof Date) return e1.getTime() === e2.getTime();

    if (e1 instanceof RegExp && e2 instanceof RegExp) return e1.toString() == e2.toString();


    if (Array.isArray(e1)) {
        if (!Array.isArray(e2)) return false;

        e1 = e1.sort();
        e2 = e2.sort();

        if (e1.length !== e2.length) return false;

        if (!e1.every((val, idx) => areTwoEntitiesEqual(val, e2[idx]))) return false;

        return true;
    }

    if (tE1 === "object") {
        let keys1 = Object.keys(e1), keys2 = Object.keys(e2);

        if (keys1.length !== keys2.length) return false;

        if (!areTwoEntitiesEqual(keys1.sort(), keys2.sort())) return false;

        if (!keys1.every(key => areTwoEntitiesEqual(e1[key], e2[key]))) return false;

        return true;
    }

    return true;
};

const asciiSort = (a, b) => {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
        if (a.charCodeAt(i) !== b.charCodeAt(i)) return a.charCodeAt(i) - b.charCodeAt(i);
    }
    return a.length - b.length;
};

export {
    isObject,
    isNotAnEmptyObject,
    hasOnlyTheseKeys,
    hasValuesAsStrings,
    isString,
    flattenAnArray,
    isNumber,
    isJustAString,
    isAlphaNumeric,
    findAllIndexes,
    findAllIndexesInArray,
    areTwoEntitiesEqual,
    asciiSort
};