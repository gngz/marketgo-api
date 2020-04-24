'use strict'

class GoogleController {
    async redirect({ ally, request }) {
        await ally.driver('google').redirect()
    }

    async callback({ ally, auth, request }) {
        try {
            const googleUser = await ally.driver('google').getUser()

            // user details to be saved
            const userDetails = {
                email: googleUser.getEmail(),
                token: googleUser.getAccessToken(),
                avatar: googleUser.getAvatar(),
                nick: googleUser.getNickname(),
                login_source: 'google'
            }

            // search for existing user
            const whereClause = {
                email: googleUser.getEmail()
            }

            const user = await User.findOrCreate(whereClause, userDetails)
            await auth.login(user)

            return 'Logged in'
        } catch (error) {
            return 'Unable to authenticate. Try again later'
        }
    }
}

module.exports = GoogleController
