const constants = require('../../src/utils/constants/db');

function user(table) {
  table.increments('id').primary();
  table.string('first_name', 25).notNullable();
  table.string('last_name', 25).notNullable();
  table
    .string('email', 50)
    .unique()
    .notNullable();
  table.string('password', 75).notNullable();

  table.timestamps(true, true);
}

function test(table) {
  table.increments('id').primary();
  table.integer('age').notNullable();
  table.enu('gender', constants.test.gender).notNullable();
  table.integer('jobs').notNullable();
  table
    .enu('accommodation_type', constants.test.accommodationType)
    .notNullable();
  table.enu('saving_account', constants.test.savingAccount).notNullable();
  table.integer('credit').notNullable();
  table.integer('deadline').notNullable();
  table.enu('porpuse', constants.test.porpuse).notNullable();
  table.enu('result', constants.test.result).nullable();
  table
    .integer('user_id')
    .unsigned()
    .nullable();

  table
    .foreign('user_id')
    .references('id')
    .inTable('user')
    .onDelete('CASCADE');

  table.timestamps(true, true);
}

exports.up = async knex => {
  await Promise.all([
    knex.schema.createTable('user', user),
    knex.schema.createTable('test', test)
  ]);
};

exports.down = async knex => {};
