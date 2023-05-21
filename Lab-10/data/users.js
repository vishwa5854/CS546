import { validationsForCreateUser, validationsForCheckUser } from "../public/js/validators/user.js";
import { users } from "../config/mongoCollections.js";
import * as bcrypt from 'bcrypt';

const usersCollection = await users();

export const createUser = async (firstName, lastName, emailAddress, password, role) => {
	validationsForCreateUser(firstName.trim(), lastName.trim(), emailAddress.trim(), password, role.trim());

	firstName = firstName.trim();
	lastName = lastName.trim();
	emailAddress = emailAddress.trim();
	role = role.trim();
	role = role.toLowerCase();
	emailAddress = emailAddress.toLowerCase();

	let userFromDB = await usersCollection.findOne({ emailAddress });

	if (userFromDB) throw "VError: User already exists with this email address";

	password = await bcrypt.hash(password, (await bcrypt.genSalt(10)));

	let newUser = { firstName, lastName, emailAddress, password, role };

	const { acknowledged, insertedId } = await usersCollection.insertOne(newUser);

	if (!acknowledged || !insertedId) throw "VError: Couldn't add user";
	return { insertedUser: true };
};

export const checkUser = async (emailAddress, password) => {
	validationsForCheckUser(emailAddress.trim(), password);
	emailAddress = emailAddress.trim();
	emailAddress = emailAddress.toLowerCase();
	
	let userFromDB = await usersCollection.findOne({ emailAddress });

	if (!userFromDB) throw "Either the email address or password is invalid";

	let { firstName, lastName, emailAddress: email, role } = userFromDB;

	let isValid = await bcrypt.compare(password, userFromDB.password);

	if (isValid) return { firstName, lastName, emailAddress: email, role };
	throw "Either the email address or password is invalid";
};
