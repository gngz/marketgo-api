'use strict'
const User = use('App/Models/User')
const { validate } = use('Validator')

class UserController {

    async login({ auth, request }) {
        const { email, password } = request.all()
        const token = await auth.attempt(email, password)
        return { token }

    }

    async register({ auth, request }) {
        const rules = {
            email: 'required|email|unique:users,email',
            password: 'required'
        }
        const data = request.only(['email', 'firstName', 'lastName', 'password'])
        const validation = await validate(data, rules)

        if (validation.fails()) {
            return validation.messages()
        }
        const user = await User.create(data)
        return { "message": "registration successful" }
    }

    show({ auth, params }) {
        if (auth.user.id !== Number(params.id)) {
            return "You cannot see someone else's profile"
        }
        return auth.user
    }
}

module.exports = UserController
