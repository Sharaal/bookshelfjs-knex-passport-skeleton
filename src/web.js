require('dotenv').config({ silent: true });

const env = process.env.NODE_ENV || 'development';

const config = require('./knexfile');
const knex = require('knex')(config[env]);
knex.migrate.latest([config])
  .then(() => {
    console.log('knex migrate finished');
  });

const ensureLoggedIn = require('./middlewares/ensureLoggedIn')();
const ensureLoggedOut = require('./middlewares/ensureLoggedOut')();

const bookshelf = require('bookshelf')(knex);
const User = require('./models/User')(bookshelf);

const app = require('express')();

app.use(require('./routers/authenticate')({ ensureLoggedOut, User }));
app.use(require('./routers/home')());
app.use(require('./routers/profile')({ ensureLoggedIn }));

app.listen(process.env.PORT);
