import express from 'express';
const app = express();
import session from 'express-session';
import configRoutes from './routes/index.js';
import exphbs from 'express-handlebars';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(
	session({
		name: 'AuthCookie',
		secret: "This is a secret.. shhh don't tell anyone",
		saveUninitialized: false,
		resave: false,
		cookie: { maxAge: 6000000 }
	})
);
app.use((req, res, next) => {
	let authString = (!req.session || !req.session.user) ? "(Non-Authenticated User)" : "(Authenticated User)";
	console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} ${authString}`);
	next();
});

app.use(async (req, res, next) => {
	if (req.path !== "/") return next();

	if (!req.session || !req.session.user) return res.redirect("/login");

	return (req.session.user.role === "admin") ? res.redirect("/admin") : res.redirect("/protected");
});

const preventRelogin = async (req, res, next) => {
	if (!req.session || !req.session.user) return next();

	return (req.session.user.role === "admin") ? res.redirect("/admin") : res.redirect("/protected");
};

app.get("/login", preventRelogin);

app.get("/register", preventRelogin);

app.get("/protected", (req, res, next) => (!req.session || !req.session.user) ? res.redirect("/login") : next())

app.get("/admin", (req, res, next) => 
					(!req.session || !req.session.user) ? res.redirect("/login") : 
						(req.session.user.role === "admin") ? next() : res.redirect("/error")
);

app.get("/logout", (req, res, next) => (!req.session || !req.session.user) ? res.redirect("/login") : next());

app.get("/error", (req, res, next) => (!req.session || !req.session.user) ? res.redirect("/login") : next());

configRoutes(app);

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
});
