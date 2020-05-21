'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShoppingCartSchema extends Schema {
  up() {
    this.create('shopping_carts', (table) => {
      table.increments()
      table.timestamps()
      table.integer('quantity').unsigned()
      table.integer('list_id').unsigned().references('id').inTable('lists')
      table.string('product_ean', 13).references('ean').inTable('products')

    })
  }

  down() {
    this.drop('shopping_carts')
  }
}

module.exports = ShoppingCartSchema
