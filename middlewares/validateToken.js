const jwt = require('jsonwebtoken')
const UserModel = require('../modules/users/user.model')

module.exports = async function validateToken(req, res, next) {
    if (typeof req.headers.authorization === 'undefined') {
        console.log('401')
        return res.status(401).json({
            status: false,
            userMessage: 'please login to proceed',
            developerMessage: 'Authorization type not specified',
        })
    }
    var token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (err) {
            return res.status(401).json({
                status: false,
                userMessage: 'Please login to access this page',
                developerMessage: err.message,
            })
        }
        // console.log(req.body.userId)
        let authToken = await (await UserModel.findById(decoded.id, '+authToken authToken')).authToken
        console.log(authToken)

        if (authToken !== token) {
            return res.status(401).json({
                status: false,
                userMessage: 'Please login to access this page',
                developerMessage: `Token mismatch:::: ${token}}`,
            })
        }
        console.log('done')
        req.body.userId = decoded.id
        req.body.roleId = decoded.roleId
        next()
    })
}