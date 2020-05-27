'use strict'
const Stripe = use('Stripe');
const List = use('App/Models/List')
const Payment = use('App/Models/Payment')
const { validate } = use('Validator')

class PaymentController {

    async index({ auth, request, response }) {
        const user = auth.user;


        return await user.payments().fetch();
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



            if (paymentIntent.status == "succeeded") {

                user.payments().create({
                    list: list.name,
                    total
                })

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
