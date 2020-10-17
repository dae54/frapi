## Roles and Permissions

### Theoretical concept
 Create a middleware to check for roles, then use roles to check for permissions, then depending on the permissions, either allow or reject the operation by passing in the req.userId to it.
- Case allow operation 
 `here pass the user id to the req.body, the is obtained from the token validation middleware and then call the next()`
- Case reject operation
 `Here just dont pass userid and also dont call next(). instead send response that not allowed`
check the example below

on my index.js file (the entry point)
```javascript
const routes = require('./routes')
routes(app)
```
on my routes.js file (the file to handle all routes)
```javascript
const BudgetItems = require('./budgetItems.routes')
const validateToken = require('./validateToken')
module.exports = (app) => {
    app.use('/user', User)
    app.use('/budgetItems', validateToken, BudgetItems)
}
```
on my budgetItems.routes.js file (the file to handle all routes for budgetitems)
```javascript
const Router = require('express')
const router = new Router()
const permissionChecker = require('./permissionChecker')
const budgetItemsController = require('./budgetItems.controller')

router.post('/create',permissionChecker, budgetItemsController.createBudgetItems)
module.exports = router
```
on my permissionChecker.js file (the file to handle all roles and permissions)
```javascript
module.exports = (req, res, next) => {
    //validate token and extract roleId of the user from the token
    //use the roleid to find the permission
    //use the permissions to check if 
    //req.role will give me the roleid of the user
    //fetch the role of the user and then find the permission 
}
```
