'use strict'
const Stripe = use('Stripe');
const List = use('App/Models/List')
const Payment = use('App/Models/Payment')
const { validate } = use('Validator')

class PaymentController {

    async index({ auth, request, response }) {
        const user = auth.user;
        const { page } = request.all();

        return await user.payments().paginate(page || 1, 15)
    }

    async getCard(customerId, cardId) {
        return await Stripe.customers.retrieveSource(customerId, cardId);
    }

    async payment({ auth, request, response }) {
        const data = request.only(['products', 'card_id', 'list_id']);
        const user = auth.user;
        const rules = {
            products: "required",
            card_id: "required",
            list_id: "required"
        }

        const validation = await validate(data, rules)

        if (validation.fails()) return response.status(400).send({ message: "Bad Request" })

        const list = await List.find(data.list_id)
        const products = (await list.products().fetch()).toJSON()
        var allowedList = [];
        products.forEach(product => {
            if (data.products.includes(product.ean)) allowedList.push(product);

        });
        let total = allowedList.reduce((total, product) => total + (product.pivot.quantity * Number(product.price)), 0)

        try {


            const paymentIntent = await Stripe.paymentIntents.create({
                currency: "eur",
                customer: user.stripe_id,
                payment_method: data.card_id,
                off_session: true,
                confirm: true,
                amount: parseInt(total * 100),
            })


            var card = await this.getCard(user.stripe_id, data.card_id);

            if (paymentIntent.status == "succeeded") {

                var result = await user.payments().create({
                    list_name: list.name,
                    total,
                    "card_last4": card.last4,
                    "card_brand": card.brand,
                })



                console.log("DEBUG", paymentIntent);

                return response.status(200).send({
                    allowedList,
                    total,
                    status: paymentIntent.status,
                });

            }
        } catch (e) {
            console.log("Exception", e);
        }








    }
}

module.exports = PaymentController
