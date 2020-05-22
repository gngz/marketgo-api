'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {

    static get createdAtColumn() { return null }
    static get updatedAtColumn() { return null }

    father() {
        return this.belongsTo('App/Models/Category')
    }
}

module.exports = Category
