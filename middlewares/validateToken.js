const jwt = require('jsonwebtoken')

module.exports = function validateToken(req, res, next) {
    if (typeof req.headers.authorization === 'undefined') {
        console.log('401')
        return res.status(401).json({
            status: false,
            userMessage: 'please login to proceed',
            developerMessage: 'Authorization type not specified',
        })
    }
    var token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                status: false,
                userMessage: 'Please login to access this page',
                developerMessage: err.message,
            })
        }
        req.body.userId = decoded.id
        // req.body.roleId = decoded.roleId
        next()
    })
}