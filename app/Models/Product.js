'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    static get primaryKey() {
        return 'ean'
    }
    category() {
        return this.hasMany('App/Models/Category');
    }
}

module.exports = Product
