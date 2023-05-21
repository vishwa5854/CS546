import authRouter from './auth_routes.js';

const constructorMethod = (app) => {
	app.use('/', authRouter);

	app.use('*', (req, res) => {
		res.sendStatus(404);
	});
};

export default constructorMethod;
