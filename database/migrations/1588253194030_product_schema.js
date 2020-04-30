'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up() {
    this.create('products', (table) => {
      table.increments() // Talvez o index não deva ser um auto increments mas sim o codigo do produto
      table.timestamps()
      table.string("name").notNullable();
      table.text("description").notNullable();
      table.decimal("price", 15, 2).notNullable();
      // Photo URL or  ID of uploads table

    })
  }

  down() {
    this.drop('products')
  }
}

module.exports = ProductSchema
