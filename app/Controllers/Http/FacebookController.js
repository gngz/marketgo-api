'use strict'

class FacebookController {
    async redirect({ ally, request }) {
        await ally.driver('facebook').redirect()
    }

    async callback({ ally, auth, request }) {
        try {
            const fbUser = await ally.driver('facebook').getUser()

            // user details to be saved
            const userDetails = {
                email: fbUser.getEmail(),
                token: fbUser.getAccessToken(),
                avatar: fbUser.getAvatar(),
                nick: fbUser.getNickname(),
                login_source: 'facebook'
            }

            // search for existing user
            const whereClause = {
                email: fbUser.getEmail()
            }

            const user = await User.findOrCreate(whereClause, userDetails)
            await auth.login(user)
            console.log("what is this auth:", auth);
            console.log("nl", auth.login);


            return 'Logged in'
        } catch (error) {
            return 'Unable to authenticate. Try again later'
        }
    }
}

module.exports = FacebookController
