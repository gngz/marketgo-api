'use strict'
const Stripe = use('Stripe');
const List = use('App/Models/List')
const { validate } = use('Validator')

class CardController {

    async index({ auth, request, response }) {
        const user = auth.user;

        const customer_id = user.stripe_id;

        const cards = await Stripe.customers.listSources(customer_id, { object: 'card' })

        return cards.data;


    }

    async create({ auth, request, response }) {

        const data = request.only(['name', 'card_number', 'exp_month', 'exp_year', 'cvc'])
        const user = auth.user;
        const customer_id = user.stripe_id;

        const token = await Stripe.tokens.create({
            card: {
                object: "card",
                number: data.card_number,
                exp_month: data.exp_month,
                exp_year: data.exp_year,
                cvc: data.cvc,
                name: data.name,
            }
        })


        var result = await Stripe.customers.createSource(customer_id, {
            source: token.id
        });

        if (result) {
            return response.status(201).send(result)
        }

        return response.status(200).send({ message: "Error ocurred" })



    }

    async delete({ auth, request, response }) {

        const data = request.only(['id'])
        const user = auth.user;
        const customer_id = user.stripe_id;

        try {
            var result = await Stripe.customers.deleteSource(customer_id, data.id);

            if (result) {
                return response.status(200).send(result)
            }
        }
        catch (err) {


            return response.status(500).send({ message: "Error ocurred" })
        }


    }

    async payment({ auth, request, response }) {
        const data = request.only(['list_id', 'card_id']);
        const user = auth.user;

        const rules = {
            list_id: "required",
            card_id: "required"
        }

        const validation = await validate(data, rules)

        if (validation.fails()) return response.status(400).send({ message: "Bad Request" })

        const list = await List.find(data.list_id)
        const products = (await list.products().fetch()).toJSON()

        var product_list = products.map((product) => {
            return {
                name: product.name,
                description: product.description,
                quantity: product.pivot.quantity,
                price: Number(product.price),
            }
        })

        let total = product_list.reduce((total, product) => total + (product.quantity * product.price), 0)

        const paymentIntent = await Stripe.paymentIntents.create({
            currency: "eur",
            customer: user.stripe_id,
            payment_method: data.card_id,
            off_session: true,
            confirm: true,
            amount: parseInt(total * 100),
        })

        return response.status(200).send({
            product_list,
            total,
            status: paymentIntent.status,
        })


    }
}

module.exports = CardController
