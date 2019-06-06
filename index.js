const startServer = require('./src/server');
const connectToDB = require('./src/domain/db/connect-db');
const { port, databaseUrl } = require('./config');
const scheduleRunner = require('./src/controller/app/schedule');

startServer(port);
connectToDB(databaseUrl);
scheduleRunner();
