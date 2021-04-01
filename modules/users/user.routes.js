const Router = require('express')
const router = new Router()
const userController = require('./user.controller')
const validateToken = require('../../middlewares/validateToken')

router.post('/login', userController.login)
router.post('/register', validateToken, userController.register)
router.post('/edit', validateToken, userController.editUser)
router.post('/changePassword', validateToken, userController.changePassword)
router.patch('/forgotPassword', userController.forgotPassword)
router.patch('/verifyCode', userController.verifyCode)
router.patch('/invite', validateToken, userController.sendInvitationEmail)
router.patch('/aprovalStatus/:userId/:status', userController.toggleAprovalStatus)
router.patch('/resetpassword', userController.resetPassword)

// router.patch('/firstTimeLogin', validateToken, userController.firstTimeLogin)

// router.get('/:id', validateToken, userController.viewUserById)
// router.get('/permissions', validateToken, userController.userPermissions)
router.get('/:id', validateToken, userController.viewUserById)
router.get('/', validateToken, userController.viewUser)
router.delete('/:_id', validateToken, userController.deleteUser)
module.exports = router

