'use strict'
const Product = use('App/Models/Product')

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
}

module.exports = ProductController
