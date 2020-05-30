'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up() {
    this.create('products', (table) => {
      //table.increments() // Talvez o index não deva ser um auto increments mas sim o codigo do produto
      table.timestamps()
      table.string("ean", 13).primary().unique();
      table.string("name").notNullable();
      table.text("description")
      table.decimal("price", 15, 2).notNullable();
      table.text("image");
      table.integer('category_id').unsigned().references('id').inTable('categories');
      table.string('location');

      // Photo URL or  ID of uploads table

    })
  }

  down() {
    this.drop('products')
  }
}

module.exports = ProductSchema
