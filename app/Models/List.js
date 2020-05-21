'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class List extends Model {
    products() {
        return this
            .belongsToMany('App/Models/Product', 'list_id', 'product_ean', 'id', 'ean')
            .pivotModel('App/Models/ShoppingCart')
            .withPivot(['quantity'])
        //.pivotTable('shopping_carts')
    }
}

module.exports = List
