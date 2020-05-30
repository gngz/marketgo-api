'use strict'
const User = use('App/Models/User')
const Product = use('App/Models/Product')
const List = use('App/Models/List')
const { validate } = use('Validator')

class ListController {
    async index({ auth, request }) {
        const user = auth.user;
        return await user.lists().fetch();

    }

    async read({ auth, params, response }) {
        const user = auth.user;
        if (params.id) { //USERID 
            const user = auth.user;
            const list = await List.find(params.id);
            if (list) {

                if (list.user_id == user.id)
                    return response.send(list);

                return response
                    .status(403)
                    .send({ message: "Forbideen" })
            }
        }

        return response
            .status(400)
            .send({ message: "bad request" })

    }

    async create({ auth, request, response }) {
        const rules = {
            name: 'required'
        }

        const data = request.only(['name'])
        const validation = await validate(data, rules)

        if (validation.fails()) {
            return response
                .status(400)
                .send(validation.messages())
        }

        const user = auth.user;
        const list = new List();


        list.name = data.name;

        const newList = await user.lists().save(list)

        if (newList) {
            return response.status(201).send(list);
        }



    }

    // TODO better validation
    async remove({ params, auth, request, response }) {
        if (params.id) {
            const user = auth.user;

            const list = await List.find(params.id);
            if (list && list.user_id == user.id) return response.status(200).send({ message: list.delete() });
            if (list == null) return response.status(404).send({ message: "List does not exist" });
            return response.status(403).send({ message: "List does not belong to this user" });



        }
        return response.status(400).send({ message: "no id supplied" });
    }

    // TODO better validation
    async update({ params, auth, request }) {
        if (params.id) {
            const user = auth.user;
            const list = await List.find(params.id);
            const data = request.only(['name'])

            if (list && list.user_id == user.id) {
                list.merge(data)
                await list.save()

                return list;

            }
        }
    }

    /**Li */
    async getProducts({ params, auth, request, response }) {
        if (params.id) {
            const user = auth.user;
            const list = await List.find(params.id);
            if (list && list.user_id == user.id) {
                var products = (await list.products().orderBy('location', 'asc').fetch()).toJSON();

                return products.map(element => {
                    element.price = parseFloat(element.price)
                    return element
                })
            }

        }
        return response.status(400).send({ messsage: "bad request" });
    }

    // TODO test this code
    async addProducts({ params, auth, request, response }) {
        const data = request.only(['id', 'ean', 'quantity'])
        const quantity = data.quantity || 1;

        if (data.id && data.ean) {
            const user = auth.user;
            const list = await List.find(data.id);
            var product = (await Product.findBy('ean', data.ean))
            if (product == null) return response.status(404).send({ message: "Product not found" });
            product = product.toJSON();
            product.price = parseFloat(product.price);
            if (list && list.user_id == user.id) {
                var hasPivot = await list.products().wherePivot('product_ean', product.ean).fetch();
                if (hasPivot.rows.length > 0) {
                    return response.status(409).send({ message: "Already added this product" });
                }
                var pivot = await list.products().attach([data.ean], (row) => row.quantity = quantity)
                //pivot.quantity = parseInt(pivot.quantity);
                return response.status(201).send({ ...product, "pivot": pivot[0] });

                //return response.status(500).send({ message: "Something unexpected went wrong! Culpa do manel" });
            }

        }
        return response.status(400).send({ messsage: "bad request" });
    }

    // TODO to test
    async removeProduct({ auth, request, response }) {
        const data = request.only(['id', 'ean'])

        if (data.id && data.ean) {
            const user = auth.user;
            const list = await List.find(data.id);
            if (list && list.user_id == user.id) {
                var num_rows = await list.products().detach([data.ean]);
                if (num_rows > 0) return response.status(200).send({ message: true })
                return response.status(404).send({ message: "product not found" })

            }
        }

        return response.status(400).send({ messsage: "bad request" });
    }

    // TODO to test
    async updateProduct({ auth, request, response }) {
        const data = request.only(['id', 'ean', 'quantity'])

        if (data.id && data.ean && data.quantity) {
            const user = auth.user;
            const list = await List.find(data.id);

            if (list && list.user_id == user.id) {
                var num_rows = await list
                    .products()
                    .pivotQuery()
                    .where('product_ean', data.ean)
                    .update({ quantity: data.quantity });
                if (num_rows > 0) return response.status(200).send({ message: true })
                return response.status(404).send({ message: "product not found" })

            }
        }

        return response.status(400).send({ messsage: "bad request" });


    }

}

module.exports = ListController
