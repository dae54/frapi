const bcrypt = require('bcrypt')
const Role = require('./roles.model')
const Permission = require('./permissions.model')
const Settings = require('../Settings/settings.model')
const Users = require('../users/user.model')
const RolePermission = require('./role_permission.model')
const mongoose = require('mongoose');


// const RolePermission = require('./role_permission.model')
// const User = require('../users/user.model')
// const NotificationSubscribers = require('../Notifications/notificationSubscribers.model')
// import Topics from "../../notifications/topics.model";
// import Transaction from "../../transactions/transaction.model";

module.exports = {
    init: async () => {
        console.log('init')
        // await module.exports.createPermission()
        // await module.exports.seedRoles()
        // await module.exports.seedRoles()

        // await module.exports.createPermission()
        // await module.exports.seedRolePermission()



        const userCount = await Users.countDocuments()
        // await module.exports.seedRoles()

        console.log(userCount)
        if (userCount === 0) {
            // console.log('here')
            await module.exports.createPermission()
            await module.exports.seedRoles()
            // await module.exports.seedRolePermission()
            await module.exports.seedSettings()
            await module.exports.seedStaff()
        }
    },
    seedStaff: async () => {
        try {
            console.log('seed staff')
            // const adminRoleId = await Role.findOne({ name: 'Administrator' }).select('_id')
            const admin = {
                firstName: 'Root',
                lastName: 'Admin',
                email: 'root@fundrequest.co.tz',
                phoneNumber: '255713000000',
                password: bcrypt.hashSync('root@fundrequest', 8),
                staffApprovalStatus: 1,
                invited: true,
                aproved: 1,
                verifiedAt: Date.now(),
                gender: 'male',
                role: (await Role.findOne({ name: 'Administrator' }).select('_id'))._id
            }
            // console.log(admin)
            const userCount = await Users.countDocuments()
            // console.log('userCount')
            if (userCount === 0) {
                console.log('seed staff start')
                const usr = await Users.create(admin)
                console.log('seed staff end')
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
            // console.log('seed permissions')
            // const permissions = [
            //     {
            //         moduleName: 'users',
            //         permissions: [
            //             { displayName: 'view', displayNameId: 0, genericName: 'view_users' },
            //             { displayName: 'create', displayNameId: 1, genericName: 'create_users' },
            //             { displayName: 'update', displayNameId: 2, genericName: 'update_users' },
            //             { displayName: 'delete', displayNameId: 3, genericName: 'delete_users' },
            //         ],
            //         description: 'Permission for user model'
            //     },
            //     {
            //         moduleName: 'requests',
            //         permissions: [
            //             { displayName: 'view', displayNameId: 0, genericName: 'view_requests' },
            //             { displayName: 'create', displayNameId: 1, genericName: 'create_requests' },
            //             { displayName: 'update', displayNameId: 2, genericName: 'update_requests' },
            //             { displayName: 'delete', displayNameId: 3, genericName: 'delete_requests' },
            //         ],
            //         description: 'Permission for requests model'
            //     },
            //     {
            //         moduleName: 'budgets',
            //         permissions: [
            //             { displayName: 'view', displayNameId: 0, genericName: 'view_budgets' },
            //             { displayName: 'create', displayNameId: 1, genericName: 'create_budgets' },
            //             { displayName: 'update', displayNameId: 2, genericName: 'update_budgets' },
            //             { displayName: 'delete', displayNameId: 3, genericName: 'delete_budgets' },
            //         ],
            //         description: 'Permission for budgets model'
            //     },
            //     {
            //         moduleName: 'settings',
            //         permissions: [
            //             { displayName: 'view', displayNameId: 0, genericName: 'view_settings' },
            //             { displayName: 'create', displayNameId: 1, genericName: 'create_settings' },
            //             { displayName: 'update', displayNameId: 2, genericName: 'update_settings' },
            //             { displayName: 'delete', displayNameId: 3, genericName: 'delete_settings' },
            //         ],
            //         description: 'Permission for settings model'
            //     },
            // ]

            // const count = await Permission.countDocuments();
            // if (count === 0) {
            //     console.log('seed permissions')
            //     permissions.forEach(async (permission) => {
            //         // const permissionInfo = {
            //         //     moduleName: permission.moduleName,
            //         //     genericName: permission.genericName
            //         // };

            //         // if (count === 0) {
            //         console.log('initialize permissions')
            //         await Permission.create(permission);
            //         return true
            //         // }
            //     });
            // }



            const PERMISSIONS = [
                { moduleName: 'users', displayName: 'view one', genericName: 'view_one_user' },
                { moduleName: 'users', displayName: 'view all', genericName: 'view_all_users' },
                { moduleName: 'users', displayName: 'create', genericName: 'create_user' },
                { moduleName: 'users', displayName: 'update', genericName: 'update_user' },
                { moduleName: 'users', displayName: 'delete', genericName: 'delete_user' },

                { moduleName: 'requests', displayName: 'view one', genericName: 'view_one_request' },
                { moduleName: 'requests', displayName: 'view all', genericName: 'view_all_requests' },
                { moduleName: 'requests', displayName: 'create', genericName: 'create_request' },
                { moduleName: 'requests', displayName: 'update', genericName: 'update_request' },
                { moduleName: 'requests', displayName: 'delete', genericName: 'delete_request' },
                { moduleName: 'requests', displayName: 'aprove', genericName: 'approve_requests' },

                { moduleName: 'settings', displayName: 'view', genericName: 'view_settings' },
                { moduleName: 'settings', displayName: 'create role', genericName: 'create_role' },
                { moduleName: 'settings', displayName: 'update', genericName: 'update_settings' },

                { moduleName: 'budgets', displayName: 'view one', genericName: 'view_one_budget' },
                { moduleName: 'budgets', displayName: 'view all', genericName: 'view_all_budgets' },
                { moduleName: 'budgets', displayName: 'create', genericName: 'create_budget' },
                { moduleName: 'budgets', displayName: 'update', genericName: 'update_budget' },
                { moduleName: 'budgets', displayName: 'delete', genericName: 'delete_budget' },
            ];

            const count = await Permission.countDocuments();
            if (count === 0) {
                console.log('seed permissions start')
                PERMISSIONS.forEach(async (permission) => {
                    await Permission.create(permission);
                });
                console.log('seed permissions done')
            }
        } catch (e) {
            return {
                developerMessage: e.message
            };
        }
    }, seedRoles: async () => {
        const roleCount = await Role.find().countDocuments();
        let perm = (await Permission.find({}, '_id')).map(item => item._id)
        // console.log(perm)


        if (roleCount === 0) {
            console.log('seed roles start')
            const roles = [{
                name: 'Administrator',
                description: 'Role for an Admin',
                type: 1,
                approvalStatus: 1,
                permission: (await Permission.find({}, '_id')).map(item => item._id)
            },
            {
                name: 'Accountant',
                description: 'Role for an Accountant',
                type: 1,
                approvalStatus: 1,
                permission: []
            },
            {
                name: 'Fund Aprover',
                description: 'Role for a Fund Aprover',
                type: 1,
                approvalStatus: 1,
                permission: []
            },
            {
                name: 'Fund Requester',
                description: 'Role for a Fund Requester',
                type: 1,
                approvalStatus: 1,
                permission: []
            },
            ]

            // console.log(roles)
            roles.forEach(async role => {
                await Role.create(role);
            })
            console.log('seed roles end')
        }
    },
    seedRolePermission: async () => {
        console.log('seed role permission')
        const rolePermissionCount = await RolePermission.find().countDocuments();

        // let as = (await Permission.findOne({ moduleName: 'users' }, 'access')).access.map(permission => permission._id)
        // console.log(as)

        if (rolePermissionCount > 0) return true
        // const admin = await Role.findOne({name:'Administrator'},'_id');
        // console.log(admin)

        const rolePermissions = [
            {
                role: (await Role.findOne({ name: 'Administrator' }, '_id'))._id,
                modules: [
                    {
                        module: (await Permission.findOne({ moduleName: 'users' }, '_id'))._id,
                        permissions: (await Permission.findOne({ moduleName: 'users' }, 'permissions')).permissions.map(permission => permission._id)
                        // [
                        //     // { permissionId: (await Permission.findOne({ moduleName: 'users' }, 'access'))._id },
                        //     { permissionId: '5f9dfasdfjk3ff8af35f7' },
                        //     { permissionId: '5f9dfasdfjk3ff8af35f7' },
                        //     { permissionId: '5f9dfasdfjk3ff8af35f7' },
                        //     // { permissionId: mongoose.Types.ObjectId(2) },
                        //     // { permissionId: mongoose.Types.ObjectId(3) }
                        // ]
                    },
                    {
                        module: (await Permission.findOne({ moduleName: 'requests' }, '_id'))._id,
                        permissions: (await Permission.findOne({ moduleName: 'requests' }, 'permissions')).permissions.map(permission => permission._id)
                    }
                    // { module: (await Permission.findOne({ moduleName: 'requests' }, '_id'))._id, access: [{ permissionId: mongoose.Types.ObjectId(0) }, { permissionId: mongoose.Types.ObjectId(1) }, { permissionId: mongoose.Types.ObjectId(2) }, { permissionId: mongoose.Types.ObjectId(3) }] },
                    // { module: (await Permission.findOne({ moduleName: 'requests' }, '_id'))._id, access: [{ permissionId: 0 }, { permissionId: 1 }, { permissionId: 2 }, { permissionId: 3 }] }
                ]
            },
            // {
            //     role: (await Role.findOne({ name: 'Accountant' }, '_id'))._id,
            //     module: (await Permission.findOne({ moduleName: 'users' }, '_id'))._id,

            // }
        ]
        // rolePermissions.forEach(async (rolePerm) => {
        const rolePermission = await RolePermission.create(rolePermissions)
        return true
        // console.log(rolePermission)
        // })


        // console.log(JSON.stringify(rolePerm))

    },
    seedSettings: async () => {
        const settingsCount = await Settings.find().countDocuments();
        // console.log(settingsCount)
        if (settingsCount === 0) {
            console.log('seeding settings start')
            const settings = [
                { name: 'idleTime', value: 1000 * 60 * 5, description: 'minimum value to logout user upon being idle' },
                { name: 'fundAprovers', value: 1, description: 'minimum number of fund aprovers to aprove a request' },
                { name: 'notificationAutoDelete', value: 1000 * 60 * 60 * 24 * 14, description: 'minimum number of fund aprovers to aprove a request' },
            ]
            settings.forEach(async settingsValue => {
                await Settings.create(settingsValue)
            })
            console.log('seeding settings end')
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