const Session = require('./session.model')

module.exports = {
    createSession: async (token, userDetails) => {
        try {
            const userSession = Session.create({ token, userDetails })
            console.log(userSession)
            return userSession
        } catch (error) {
            console.log(error)
        }
    }, getSession: async (req, res) => {
        try {
            console.log('get session called')
            const useSession = Session.find()
        } catch (error) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: error.message
            })
        }
    }, invalidateSession: async (token) => {
        try {
            const deleteSession = await Session.deleteOne({ token })
            console.log(deleteSession)
            return true
        } catch (error) {
            console.log(error)
            return error
        }
    }
}