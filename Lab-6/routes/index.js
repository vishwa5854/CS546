import bandsRouter from "./bands.js";
import albumsRouter from "./albums.js";

const constructorMethod = (app) => {
	app.use('/bands', bandsRouter);
	app.use('/albums', albumsRouter);
	app.use('*', (req, res) => res.status(404).json({ error: 'Route Not found' }));
};

export default constructorMethod;
