'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentSchema extends Schema {
  up() {
    this.create('payments', (table) => {
      table.increments()
      table.timestamps()
      table.string("list_name")
      table.decimal("total", 15, 2).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users');
    })
  }

  down() {
    this.drop('payments')
  }
}

module.exports = PaymentSchema
