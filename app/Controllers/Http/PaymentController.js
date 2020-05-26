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
                    product_list,
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
