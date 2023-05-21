//Here you will require route files and export them as used in previous labs.
import textAnalyzerRouter from "./textanalyzer.js";

const constructorMethod = (app) => {
    app.use('/', textAnalyzerRouter);

    app.use('*', (req, res) => res.status(404).json({ error: 'Route Not found' }));
};

export default constructorMethod;
