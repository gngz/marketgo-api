'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ShoppingCart extends Model {
    static get table() {
        return 'shopping_carts'
    }
}

module.exports = ShoppingCart
