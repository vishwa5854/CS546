import { create, getAll, get, remove, rename } from "./data/bands.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";

let pinkFloydBand, vishwaBand, allBands, thirdBand, badBand;
await dbConnection();

try {
    /** 1. Create a band of your choice. */
    pinkFloydBand = await create("Pink Floyd", ["Progressive Rock", "Psychedelic rock", "Classic Rock"], "http://www.pinkfloyd.com", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett"], 1965);
} catch (err) {
    console.log(err);
}

/** 2. Log the newly created band. (Just that band, not all bands) */
console.log(pinkFloydBand);

try {
    /** 3. Create another band of your choice. */
    vishwaBand = await create("Vishwanath Bondugula", ["Jazz", "Chill Lofi Beats"], "http://www.vishwa.com", "Vish Inc", ["Me", "MySelf", "I"], 2020);
    console.log(vishwaBand);
} catch (err) {
    console.log(err);
}

try {
    /** 4. Query all bands, and log them all */
    allBands = await getAll();
    console.log(allBands);
} catch (err) {
    console.log(err);
}

try {
    /** 5. Create the 3rd band of your choice. */
    thirdBand = await create("Lennon's Boys", ["Rock", "    Pop", "Psychedelia  "], "http://www.thebeatles.com", "  Parlo phone ", ["John Lennon    ", "    Paul McCartney", "  George Harrison", "Ringo Starr"], 1960);
} catch (err) {
    console.log(err);
}

/** 6. Log the newly created 3rd band. (Just that band, not all bands) */
console.log(thirdBand);

/** 7. Rename the first band */
try {
    pinkFloydBand = await rename(pinkFloydBand._id, "   Renamed  ");
} catch (err) {
    console.log(err);
}

/** 8. Log the first band with the updated name.  */
console.log(pinkFloydBand);

try {
    /** 9. Remove the second band you created. */
    console.log(await remove(vishwaBand._id));
} catch (err) {
    console.log(err);
}

try {
    /** 10. Query all bands, and log them all */
    console.log(await getAll());
} catch (err) {
    console.log(err);
}

try {
    /** 11. Try to create a band with bad input parameters to make sure it throws errors. */
    badBand = await create("   ", ["Progressive Rock", "Psychedelic rock", "Classic Rock"], "http://www.pinkfloyd.com", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett"], 1965);
} catch (err) {
    console.log(err);
}

try {
    /** 12. Try to remove a band that does not exist to make sure it throws errors. */
    console.log(await remove(vishwaBand._id));
} catch (err) {
    console.log(err);
}

try {
    /** 13. Try to rename a band that does not exist to make sure it throws errors. */
    vishwaBand = await rename(vishwaBand._id, "   Renamed  ");
} catch (err) {
    console.log(err);
}

try {
    /** 14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors. */
    vishwaBand = await rename(vishwaBand._id, "     ");
} catch (err) {
    console.log(err);
}

try {
    /** 15. Try getting a band by ID that does not exist to make sure it throws errors. */
    console.log(await get(vishwaBand._id));
} catch (err) {
    console.log(err);
}

try {
    console.log(await get(pinkFloydBand._id));
} catch (err) {
    console.log(err);
}

try {
    console.log(await get("  "));
} catch (err) {
    console.log(err);
}

try {
    console.log(await get(" somehing "));
} catch (err) {
    console.log(err);
}

try {
    console.log(await get(pinkFloydBand._id + "             "));
} catch (err) {
    console.log(err);
}

try {
    console.log(await create("Linkin Park", ["Alternative Rock", "Pop Rock", "Alternative Metal"], "hTtp://WWw.abcde.COm", "Warner", ["Chester Bennington", "Rob Bourdon", "Brad Delson", "Mike Shinoda", "Dave Farrell", "Joe Hahn"], 1996))
}catch (e){
    console.log(e)
}

await closeConnection();
