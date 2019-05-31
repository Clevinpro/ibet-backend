const dbUser = 'clevin';
const dbPassword = 'i625ePaoq2iZzE4Z';

const config = {
  secret: 'key123',
  port: 8080,
  databaseUrl: `mongodb+srv://${dbUser}:${dbPassword}@cluster0-xspur.mongodb.net/ibet?retryWrites=true&w=majority`
};

module.exports = config;
