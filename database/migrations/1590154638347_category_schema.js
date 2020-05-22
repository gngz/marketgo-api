'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up() {
    this.create('categories', (table) => {
      table.increments()
      table.text('name')
      table.integer('category_id').unsigned().references('id').inTable('categories');

    })
  }

  down() {
    this.drop('categories')
  }
}

module.exports = CategorySchema
