import { Router } from 'express';
import { validationsForCheckUser, validationsForCreateUser } from '../public/js/validators/user.js';
import { checkUser, createUser } from '../data/users.js';

const router = Router();

router.route('/').get(async (req, res) => {
	//code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
	return res.json({ error: 'YOU SHOULD NOT BE HERE!' });
});

router
	.route('/register')
	.get((req, res) => res.render('register', { title: "Register" }))
	.post(async (req, res) => {
		try {
			if (!req.body) return res.status(400).send("Error: Body cannot be empty");

			let {
				firstNameInput: firstName,
				lastNameInput: lastName,
				emailAddressInput: emailAddress,
				passwordInput: password,
				confirmPasswordInput,
				roleInput: role
			} = req.body;
	
			validationsForCreateUser(firstName.trim(), lastName.trim(), emailAddress.trim(), password, role.trim());
	
			if (password !== confirmPasswordInput) 
				return res.status(400).render('register', { title: 'Register', error: "400 - Error: Both password & confirm password should match." });
	
			let newUser = await createUser(firstName, lastName, emailAddress, password, role);

			if (newUser.insertedUser) return res.redirect("/login");
		} catch (err) {
			console.error(err);

			if (typeof err === "string") 
				return err.startsWith("VError") ? 
					res.status(400).render('register', { title: "Register", error: `400 - ${err.substr(1)}`}) : 
					res.status(400).render('register', { title: "Register", error: `400 - ${err}` });

			return res.status(500).send("Internal Server Error");
		}
	});

router
	.route('/login')
	.get((req, res) => res.render('login', { title: "Login" }))
	.post(async (req, res) => {
		try {
			if (!req.body) return res.status(400).send("Error: Email and password are required");
			let { emailAddressInput: emailAddress, passwordInput: password } = req.body;
			validationsForCheckUser(emailAddress.trim(), password.trim());

			let user = await checkUser(emailAddress, password);
			req.session.user = user;

			return (user.role === "admin") ? res.redirect("/admin") : res.redirect("/protected"); 
		} catch (err) {
			console.error(err);

			if (typeof err === "string") 
				return err.startsWith("VError") ? 
					res.status(400).render('login', { title: "Login", error: `400 - ${err.substr(1)}`}) : 
					res.status(400).render('login', { title: "Login", error: `400 - ${err}` });

			return res.status(500).send("Internal Server Error");
		}
	});

router.route('/protected').get((req, res) => {
	let data = { 
		title: "Protected", 
		isAdmin: (req.session.user.role === "admin"), 
		firstName: req.session.user.firstName,
		currentTime: new Date().toUTCString(),
		role: req.session.user.role
	};
	return res.render("protected", data);
});

router.route('/admin').get((req, res) => res.render('admin', { firstName: req.session.user.firstName, currentTime: new Date().toUTCString(), title : 'admin' }));

router.route('/error').get((req, res) => res.status(403).render('error', { title: 'error'}));

router.route('/logout').get(async (req, res) => {
	req.session.destroy();
	return res.render('logout', { title: "logout" });
});

export default router;
