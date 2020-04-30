'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ListSchema extends Schema {
  up() {
    this.create('lists', (table) => {
      table.increments()
      table.timestamps()
      table.string("name")
    })
  }

  down() {
    this.drop('lists')
  }
}

module.exports = ListSchema
