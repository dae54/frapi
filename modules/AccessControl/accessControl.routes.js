const Router = require('express')
const accessController = require('./accessControl.controller')
const checkPermission = require('../../middlewares/checkPermissions')

const routes = new Router();
//create user roles
// checkPermission('access-control', 'write-role')
routes.post('/roles', accessController.createRole);
//create user roles
routes.patch('/roles/:id', checkPermission('access-control', 'write-role'), accessController.updateRole);
//fetch user roles
routes.get('/roles', accessController.getRoles);
//post permission
//routes.post('/permission', accessController.createPermission);
//post permission
// routes.get('/permissions',authJwt, accessController.getPermission);
routes.get('/permissions', accessController.getPermission);
//give role permission
routes.patch('/grantPermission', checkPermission('access-control', 'write-role'), accessController.rolePermission);
//get staffs based on role id
routes.get('/roles/:id/staff', accessController.getStaffByRoleID);
//delete role
routes.delete('/roles/:id', accessController.deleteRole);
//approve role 
routes.patch('/roles/:id/approve', checkPermission('access-control', 'approve-role'), accessController.approveRole);
//export routes
module.exports = routes;