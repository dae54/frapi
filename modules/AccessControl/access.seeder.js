const bcrypt = require('bcrypt')
const Role = require('./roles.model')
const Permission = require('./permissions.model')
const Settings = require('../Settings/settings.model')
const Users = require('../users/user.model')

// const RolePermission = require('./role_permission.model')
// const User = require('../users/user.model')
// const NotificationSubscribers = require('../Notifications/notificationSubscribers.model')
// import Topics from "../../notifications/topics.model";
// import Transaction from "../../transactions/transaction.model";

module.exports = {
    init: async () => {
        console.log('init')
        const userCount = await Users.countDocuments()
        console.log(userCount)
        if (userCount === 0) {
            console.log('here')
            await module.exports.createPermission()
            await module.exports.seedRoles()
            await module.exports.seedSettings()
            await module.exports.seedStaff()
        }
    },
    seedStaff: async () => {
        try {
            console.log('seed staff')
            const adminRoleId = await Role.findOne({ name: 'Administrator' }).select('_id')
            const admin = {
                firstName: 'Root',
                lastName: 'Admin',
                email: 'root@fundrequest.co.tz',
                phoneNumber: '255713000000',
                password: bcrypt.hashSync('root@fundrequest',8),
                staffApprovalStatus: 1,
                verifiedAt: Date.now(),
                gender: 'male',
                roleId: adminRoleId._id
            }
            console.log(admin)
            const userCount = await Users.countDocuments()
            console.log('userCount')
            if (userCount === 0) {
                console.log('seed staff')
                const usr = await Users.create(admin)
                console.log(usr)
            }

            // await createPermission();
            // await seedTopics();
            //await cleanData();
            // staffs.forEach(async (staff) => {
            //     await createRole(staff.role, staff.info, staff.permissions)
            // });
        } catch (e) {
            return {
                developerMessage: e.message
            };
        }
    },

    createPermission: async () => {
        try {
            const PERMISSIONS = [
                { moduleName: 'users', moduleId: 0, displayName: 'view', displayNameId: 0, genericName: 'view_users' },
                { moduleName: 'users', moduleId: 0, displayName: 'create', displayNameId: 1, genericName: 'write_user' },
                { moduleName: 'users', moduleId: 0, displayName: 'update', displayNameId: 2, genericName: 'update_user' },
                { moduleName: 'users', moduleId: 0, displayName: 'delete', displayNameId: 3, genericName: 'delete_user' },

                // { moduleName: 'access-control', displayName: 'Can create,update and delete role', genericName: 'write-role' },
                // { moduleName: 'access-control', displayName: 'Can view role', genericName: 'read-role' },
                // { moduleName: 'access-control', displayName: 'Can approve role', genericName: 'approve-role' },
                // { moduleName: 'access-control', displayName: 'Can view permissions', genericName: 'read-permissions' },

                { moduleName: 'requests', moduleId: 1, displayName: 'view', displayNameId: 0, genericName: 'view_requests' },
                { moduleName: 'requests', moduleId: 1, displayName: 'create', displayNameId: 1, genericName: 'create_requests' },
                { moduleName: 'requests', moduleId: 1, displayName: 'update', displayNameId: 2, genericName: 'update_requests' },
                { moduleName: 'requests', moduleId: 1, displayName: 'delete', displayNameId: 3, genericName: 'delete_requests' },

                { moduleName: 'settings', moduleId: 2, displayName: 'view', genericName: 'view_settings' },
                { moduleName: 'settings', moduleId: 2, displayName: 'update', genericName: 'update_settings' },

                { moduleName: 'budgets', moduleId: 3, displayName: 'view', genericName: 'view_budgets' },
                { moduleName: 'budgets', moduleId: 3, displayName: 'create', genericName: 'create_budgets' },
                { moduleName: 'budgets', moduleId: 3, displayName: 'update', genericName: 'update_budgets' },
                { moduleName: 'budgets', moduleId: 3, displayName: 'delete', genericName: 'delete_budgets' },
            ];
            const count = await Permission.countDocuments();
            if (count === 0) {
                console.log('seed permissions')
                PERMISSIONS.forEach(async (permission) => {
                    // const permissionInfo = {
                    //     moduleName: permission.moduleName,
                    //     genericName: permission.genericName
                    // };

                    // if (count === 0) {
                    console.log('initialize permissions')
                    await Permission.create(permission);
                    // }
                });
            }
        } catch (e) {
            return {
                developerMessage: e.message
            };
        }
    }, seedRoles: async () => {
        const roleCount = await Role.find().countDocuments();
        if (roleCount === 0) {
            console.log('initialize default roles')
            const roles = [
                { name: 'Administrator', description: 'Role for an Admin', type: 1 },
                { name: 'Fund Aprover', description: 'Role for a Fund Aprover', type: 1 },
                { name: 'Fund Requester', description: 'Role for a Fund Requester', type: 1 },
                { name: 'Accountant', description: 'Role for the accountant', type: 1 },
            ]
            roles.forEach(async role => {
                await Role.create(role);
            })
        }
    }, seedSettings: async () => {
        const settingsCount = await Settings.find().countDocuments();
        // console.log(settingsCount)
        if (settingsCount === 0) {
            console.log('seeding settings')
            const settings = [
                { name: 'idleTime', value: 1000 * 60 * 5, description: 'minimum value to logout user upon being idle' },
                { name: 'fundAprovers', value: 1, description: 'minimum number of fund aprovers to aprove a request' },
                { name: 'notificationAutoDelete', value: 1000 * 60 * 60 * 24 * 14, description: 'minimum number of fund aprovers to aprove a request' },
            ]
            settings.forEach(async settingsValue => {
                await Settings.create(settingsValue)
            })
        }
    },
    seedNotificationSubscribers: async () => {
        // const Subs = [{title:'new_request', role:}]
    },
    //  seedAdmin: async () => {
    //     const userCount = await Users.countDocuments();
    //     if (userCount === 0) {
    //         console.log('seeding admin')
    //         const settings = [
    //             { name: 'idleTime', value: 1000 * 60 * 5, description: 'minimum value to logout user upon being idle' },
    //             { name: 'fundAprovers', value: 1, description: 'minimum number of fund aprovers to aprove a request' },
    //             { name: 'notificationAutoDelete', value: 1000 * 60 * 60 * 24 * 14, description: 'minimum number of fund aprovers to aprove a request' },
    //         ]
    //         settings.forEach(async settingsValue => {
    //             await Settings.create(settingsValue)
    //         })
    //     }
    // }
}


// export async function createRole(role, staff, permissions) {
//     try {
//         const count = await Role.countDocuments({ name: role.name });
//         if (count === 0) {
//             const newRole = await Role.create(role);
//             const rolePermissions = await assignRolePermission(newRole._id, permissions);
//             registerStaff({ ...staff, role: newRole._id });
//         } else {
//             const roleInfo = await Role.findOne({ name: role.name });
//             const rolePermissions = await assignRolePermission(roleInfo._id, permissions);
//         }
//     } catch (e) {
//         console.log('created role: ', e);
//         return {
//             developerMessage: e.message
//         };
//     }
// }
// export async function registerStaff(staff) {
//     try {
//         const count = await User.countDocuments({ email: staff.email });
//         if (count === 0) {
//             const user = await User.create(staff);
//             return user;
//         }
//     } catch (e) {
//         return {
//             userMessage: 'Whoops! Something went wrong.',
//             developerMessage: e.message,
//         };
//     }
// }
// async function assignRolePermission(roleID, permissions) {
//     try {
//         for (let i = 0; i < permissions.length; i++) {
//             const permission = await Permission.findOne({ genericName: permissions[i] });
//             const rolePermission = { role: roleID, permission: permission._id };
//             const count = await RolePermission.countDocuments(rolePermission);
//             if (count === 0) {
//                 const access = await RolePermission.create(rolePermission);
//             }
//         }
//         return { status: "success" };
//     } catch (e) {
//         console.log(e.message);
//     }
// }

// export async function seedTopics() {
//     try {
//         const TOPICS = [
//             { displayName: 'Staff approval notifications', genericName: 'approve-staff' },
//             { displayName: 'Role approval notifications', genericName: 'approve-role' },
//             { displayName: 'Transaction maker notifications', genericName: 'transaction-maker' },
//             { displayName: 'Transaction checker notifications', genericName: 'transaction-checker' },
//         ];
//         TOPICS.forEach(async (topic) => {
//             const topicsInfo = {
//                 genericName: topic.genericName
//             };
//             const count = await Topics.countDocuments(topicsInfo);
//             if (count === 0) {
//                 const createdTopic = await Topics.create(topic);
//             }
//         });
//     } catch (e) {
//         console.log(e.message);
//     }
// }
// async function cleanData() {
//     try {
//         //const user = await User.deleteOne({ email: staff.email });
//         //const permission = await Permission.collection.drop();
//         //onst role = await Role.collection.drop();
//         const status = await Transaction.collection.drop();
//         console.log('deleted Transaction: ');

//     } catch (e) {
//         return {
//             userMessage: 'Whoops! Something went wrong.',
//             developerMessage: e.message,
//         };
//     }
// }