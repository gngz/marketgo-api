'use strict'
const Product = use('App/Models/Product')
const Category = use('App/Models/Category')

class ProductController {
    async getAll({ auth, request, response }) {

        return await Product.all();

    }

    async getProduct({ params, auth, request, response }) {
        if (!params.ean) return response.status(400).send({ message: "bad request" })

        var product = await Product.findBy('ean', params.ean)
        if (product == null) return response.status(404).send({ message: "No such product" });
        return response.status(200).send(product);
    }

    async getProductsByCategory({ params, response }) {
        if (!params.id) return response.status(400).send({ message: "bad request" })

        var category = await Category.find(params.id);
        var products = await category.products().setHidden(['category_id']).fetch();

        if (products) {
            return response.status(200).send(products);
        }

        return response.status(404).send({ message: "Products not found" });

    }
}

module.exports = ProductController
