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
        const data = request.only(['email', 'name', 'password'])
        const validation = await validate(data, rules)

        if (validation.fails()) {
            return validation.messages()
        }
        const user = await User.create(data)
        const token = await auth.generate(user)
        return { "message": "registration successful", "token": token.token }
    }

    async googleLogin({ ally, auth, request }) {
        if (request.input('token') == null) return;
        var googleUser = await ally.driver('google').getUserByToken(request.input('token'))

        const userDetails = {
            email: googleUser.getEmail(),
            avatar: googleUser.getAvatar(),
            name: googleUser.getName(),
        }

        // search for existing user
        const whereClause = {
            email: googleUser.getEmail()
        }

        const user = await User.findOrCreate(whereClause, userDetails)
        const token = await auth.generate(user)
        return { ok: "yes" }
    }

    async facebookLogin({ ally, auth, request }) {
        if (request.input('token') == null) return;
        var facebookUser = await ally.driver('facebook').getUserByToken(request.input('token'))

        const userDetails = {
            email: facebookUser.getEmail(),
            avatar: facebookUser.getAvatar(),
            name: facebookUser.getName(),
        }

        // search for existing user
        const whereClause = {
            email: facebookUser.getEmail()
        }

        const user = await User.findOrCreate(whereClause, userDetails)
        const token = await auth.generate(user)
        return { ok: "yes" }

    }

    show({ auth, params }) {
        if (auth.user.id !== Number(params.id)) {
            return "You cannot see someone else's profile"
        }
        return auth.user
    }
}

module.exports = UserController
