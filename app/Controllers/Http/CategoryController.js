'use strict'
const Category = use('App/Models/Category')
const Product = use('App/Models/Product')

class CategoryController {

    async getCategories({ auth, request, response }) {
        //const user = auth.user;
        const categories = await Category.all();
        /*  await Database.table('products').count().groupBy('category_id').
         var categories = categories.map((category) => {
             vProduct.findBy('category_id',category.id).count
             return {
                 name: category.name,
                 id: category.id,
                 number_of_items: product.pivot.quantity,
                 price: Number(product.price),
             }
         }) */

        return response.status(200).send(categories);
    }


}

module.exports = CategoryController
