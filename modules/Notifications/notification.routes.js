const Router = require('express')
const router = new Router()
const notificationController = require('./notification.controller')

//create notifications
// router.post('/', notificationController.fetchNotifications)
router.post('/subscribe', notificationController.subscribe)
router.get('/', notificationController.fetchNotifications)
router.get('/:userID', notificationController.fetchNotificationByUserID)
router.patch('/markread', notificationController.markRead)
router.delete('/:notificationID', notificationController.delete)

module.exports = router

// from finlink

// import { Router } from 'express';
// import * as notificationsController from './notifications.controller';
// import { authJwt,checkPermission } from '../../services/auth.services';
// const routes = new Router();
// //create notifications
// routes.get('/', authJwt,notificationsController.getNotifications);
// //change notification status
// routes.patch('/:id/markAsRead', notificationsController.updateReadStatus);
// //change notification status
// routes.post('/subscribe',authJwt, notificationsController.subscribeToNotifications);

// //export routes
// export default routes;