'use strict';

module.exports = {
  up: (knex, Promise) => Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username');
      table.string('password');
      table.string('nickname');
      table.string('email');
    }).then(() => {
        return knex('users').insert([
          { username: 'sharaal', password: 'sharaal', nickname: 'Sharaal', email: 'developer@dragonprojects.de' },
        ]);
      }
    ),
  ]),
  down: (knex, Promise) => Promise.all([
    knex.schema.dropTable('users'),
  ]),
};
