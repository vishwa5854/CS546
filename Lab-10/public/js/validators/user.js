import { validationsForStrings, isEmail, hasNumbers } from "./util.js";

const validationsForCreateUser = (firstName, lastName, emailAddress, password, role) => {
    validationsForStrings("firstName", firstName, false, { min: 2, max: 25 });

    if (hasNumbers(firstName)) throw "VError: firstName cannot contain numbers";

    validationsForStrings("lastName", lastName, false, { min: 2, max: 25 });

    if (hasNumbers(lastName)) throw "VError: lastName cannot contain numbers";

    validationsForStrings("emailAddress", emailAddress, false);
    validationsForStrings("role", role, false);

    if (!isEmail(emailAddress)) throw "VError: emailAddress is invalid";

    validationsForStrings("password", password, false, { min: 8, max: Infinity });

    if (password.includes(" ")) throw "VError: Password must not contain any spaces.";

    if (password.toLowerCase() === password) throw "VError: Atleast one letter should be capital";

    let specialCharsRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let numbersRegex = /[0-9]/;

    if (!password.match(numbersRegex)) throw "VError: Password must contain atleast one number";

    if (!password.match(specialCharsRegex)) throw "VError: Password must contain atleast one special char";

    if (!["admin", "user"].includes(role.toLowerCase())) throw "VError: Role must be either admin or user";
};

const validationsForCheckUser = (emailAddress, password) => {
    validationsForStrings("emailAddress", emailAddress, false);

    if (!isEmail(emailAddress)) throw "VError: emailAddress is invalid";
    
    validationsForStrings("password", password, false, { min: 8, max: Infinity });

    if (password.includes(" ")) throw "VError: Password must not contain any spaces.";

    if (password.toLowerCase() === password) throw "VError: Atleast one letter should be capital";

    let specialCharsRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let numbersRegex = /[0-9]/;

    if (!password.match(numbersRegex)) throw "VError: Password must contain atleast one number";

    if (!password.match(specialCharsRegex)) throw "VError: Password must contain atleast one special char";
};

export { validationsForCreateUser, validationsForCheckUser };
