'use strict'
const User = use('App/Models/User')
const { validate } = use('Validator')
const Stripe = use('Stripe');

class UserController {

    async login({ auth, request }) {
        const { email, password } = request.all()
        const token = await auth.attempt(email, password)
        const user = await User.findBy('email', email);
        return { user, token: token.token }

    }

    async register({ auth, request }) {
        const rules = {
            email: 'required|email|unique:users,email',
            password: 'required'
        }
        const data = request.only(['email', 'name', 'password'])
        const validation = await validate(data, rules)

        if (validation.fails()) {
            return validation.messages()
        }

        var customer = await Stripe.customers.create({
            name: data.name,
            email: data.email,
        })


        data.stripe_id = customer.id;
        const user = await User.create(data)

        const token = await auth.generate(user)
        return { "message": "registration successful", user, "token": token.token }
    }

    async googleLogin({ ally, auth, request, response }) {
        if (request.input('token') == null) return response.status(400).send({ message: "Bad Request - Token Needed" });

        try {
            var googleUser = await ally.driver('google').getUserByToken(request.input('token'))
        } catch (error) {
            console.log(error);
            return response.status(400).send({ message: "Bad Request - Invalid Token" });
        }


        var customer = await Stripe.customers.create({
            name: googleUser.getName(),
            email: googleUser.getEmail(),
        })



        const userDetails = {
            email: googleUser.getEmail(),
            avatar: googleUser.getAvatar(),
            name: googleUser.getName(),
            "stripe_id": customer.id,
        }

        // search for existing user
        const whereClause = {
            email: googleUser.getEmail()
        }

        const user = await User.findOrCreate(whereClause, userDetails)

        const token = await auth.generate(user)
        return { user, "token": token.token }
    }

    async facebookLogin({ ally, auth, request, response }) {

        if (request.input('token') == null) return response.status(400).send({ message: "Bad Request - Token Needed" });

        try {
            var facebookUser = await ally.driver('facebook').getUserByToken(request.input('token'))
        } catch (error) {
            console.log(error);
            return response.status(400).send({ message: "Bad Request - Invalid Token" });
        }


        var customer = await Stripe.customers.create({
            name: facebookUser.name,
            email: facebookUser.email,
        })

        const userDetails = {
            email: facebookUser.getEmail(),
            avatar: facebookUser.getAvatar(),
            name: facebookUser.getName(),
            "stripe_id": customer.id,
        }

        // search for existing user
        const whereClause = {
            email: facebookUser.getEmail()
        }

        const user = await User.findOrCreate(whereClause, userDetails)
        const token = await auth.generate(user)
        return { user, "token": token.token }

    }

    show({ auth, params }) {
        if (auth.user.id !== Number(params.id)) {
            return "You cannot see someone else's profile"
        }
        return auth.user
    }

    async verify({ auth, request, response }) {
        try {
            await auth.check()
            return response.send({ message: "valid" })
        } catch (error) {
            const authorization = request.header('Authorization')
            if (authorization == null) return response.status(400).send({ message: "No Token" })

            return response.send({ message: "Invalid Token" })
        }
    }
}

module.exports = UserController
