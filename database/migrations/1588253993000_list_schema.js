'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ListSchema extends Schema {
  up() {
    this.create('lists', (table) => {
      table.increments()
      table.timestamps()
      table.string("name")
      table.integer('user_id').unsigned().references('id').inTable('users');
    })
  }

  down() {
    this.drop('lists')
  }
}

module.exports = ListSchema
