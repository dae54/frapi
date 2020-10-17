const User = require('../modules/users/user.model');
const RolePermissions = require('../modules/AccessControl/role_permission.model');

module.exports = function checkPermission(moduleName, route) {
    return async function (req, res, next) {
        const user = await User.findOne({ _id: req.user._id }).populate('role');
        if (user.staffApprovalStatus === 0) {
            return res.status(403)
                .json({ status: false, developerMessage: "Your account is not approved" });
        } else if (user.role.approvalStatus === 0) {
            return res.status(403)
                .json({ status: false, developerMessage: "Your role is not approved" });
        }
        const permissions = await RolePermissions.find({ role: req.user.role }).populate("permission");
        let hasAccess = false;
        permissions.forEach(permission => {
            if (permission.permission.moduleName === moduleName) {
                permissions.forEach(permission => {
                    if (permission.permission.genericName === route) {
                        hasAccess = true;
                    }
                });
            }
        });
        if (hasAccess) {
            next();
        } else {
            return res.status(403).json({ status: hasAccess, developerMessage: "You don't have access to this route" });
        }
    }
}