const User = require('./modules/users/user.routes')
const BudgetItems = require('./modules/BudgetItems/budgetItems.routes')
const Budget = require('./modules/Budgets/budgets.routes')
const Request = require('./modules/Requests/requests.routes')
const validateToken = require('./middlewares/validateToken')
const Notification = require('./modules/Notifications/notification.routes')
const AccessControl = require('./modules/AccessControl/accessControl.routes')
const Settings = require('./modules/Settings/settings.routes')

module.exports = (app) => {
    app.use('/user', User)
    app.use('/budgetItems', validateToken, BudgetItems)
    app.use('/budgets', validateToken, Budget)
    app.use('/requests', validateToken, Request)
    // app.use('/requests', Request)
    app.use('/notifications',validateToken, Notification)
    app.use('/accessControl',validateToken, AccessControl)
    app.use('/settings',validateToken, Settings)
}