import HTTPStatus from "http-status";
import Role from '../role.model';
import Permission from '../permission.model';
import RolePermission from '../role.permission.model';
import User from '../../users/user.model';
import Topics from "../../notifications/topics.model";
import Transaction from "../../transactions/transaction.model";
import { hashSync, compareSync } from 'bcrypt-nodejs';

export async function seedStaff() {
    try {
        const staffs = [
            {
                info: {
                    firstName: 'Root',
                    lastName: 'Admin',
                    //displayName: 'Bradley Mushi',
                    userType: 'root',
                    email: 'root@finlink.co.tz',
                    phoneNumber: '255713000000',
                    password: hashSync('root@finlink'),
                    staffApprovalStatus:1,
                    verifiedAt: Date.now()
                },
                role: {
                    name: 'Root',
                    description: 'Controls the whole system',
                    approvalStatus: 1
                },
                permissions: [
                    'write-role',
                    'read-role',
                    'read-permissions',
                    'write-staff',
                    'read-staff',
                    'read-transactions',
                    'approve-staff',
                    'approve-role'
                ]
            }
        ];
        await createPermission();
        await seedTopics();
        //await cleanData();
        staffs.forEach(async (staff) => {
            await createRole(staff.role, staff.info, staff.permissions)
        });
    } catch (e) {
        return {
            developerMessage: e.message
        };
    }
}
export async function createPermission() {
    try {
        const PERMISSIONS = [
            { moduleName: 'users', displayName: 'Can view users', genericName: 'read-users' },
            { moduleName: 'users', displayName: 'Can create,update and delete staff ', genericName: 'write-staff' },
            { moduleName: 'users', displayName: 'Can view staffs', genericName: 'read-staff' },
            { moduleName: 'users', displayName: 'Can approve staffs', genericName: 'approve-staff' },
            { moduleName: 'access-control', displayName: 'Can create,update and delete role', genericName: 'write-role' },
            { moduleName: 'access-control', displayName: 'Can view role', genericName: 'read-role' },
            { moduleName: 'access-control', displayName: 'Can approve role', genericName: 'approve-role' },
            { moduleName: 'access-control', displayName: 'Can view permissions', genericName: 'read-permissions' },
            { moduleName: 'accounts', displayName: 'Can view transactions', genericName: 'read-transactions' },
            { moduleName: 'accounts', displayName: 'Can create transactions', genericName: 'transaction-maker' },
            { moduleName: 'accounts', displayName: 'Can check transactions', genericName: 'transaction-checker' },
            { moduleName: 'audit-trail', displayName: 'Can view audit trail', genericName: 'read-audit-trail' },
            { moduleName: 'bank-transactions', displayName: 'Can record bank transactions', genericName: 'write-bank-transactions' },
            { moduleName: 'bank-transactions', displayName: 'Can ciew bank transactions', genericName: 'read-bank-transactions'},
        ];
        PERMISSIONS.forEach(async (permission) => {
            const permissionInfo = {
                moduleName: permission.moduleName,
                genericName: permission.genericName
            };
            const count = await Permission.countDocuments(permissionInfo);
            if (count === 0) {
                const access = await Permission.create(permission);
            }
        });
    } catch (e) {
        return {
            developerMessage: e.message
        };
    }
}
export async function createRole(role, staff, permissions) {
    try {
        const count = await Role.countDocuments({ name: role.name });
        if (count === 0) {
            const newRole = await Role.create(role);
            const rolePermissions = await assignRolePermission(newRole._id, permissions);
            registerStaff({ ...staff, role: newRole._id });
        } else {
            const roleInfo = await Role.findOne({ name: role.name });
            const rolePermissions = await assignRolePermission(roleInfo._id, permissions);
        }
    } catch (e) {
        console.log('created role: ', e);
        return {
            developerMessage: e.message
        };
    }
}
export async function registerStaff(staff) {
    try {
        const count = await User.countDocuments({ email: staff.email });
        if (count === 0) {
            const user = await User.create(staff);
            return user;
        }
    } catch (e) {
        return {
            userMessage: 'Whoops! Something went wrong.',
            developerMessage: e.message,
        };
    }
}
async function assignRolePermission(roleID, permissions) {
    try {
        for (let i = 0; i < permissions.length; i++) {
            const permission = await Permission.findOne({ genericName: permissions[i] });
            const rolePermission = { role: roleID, permission: permission._id };
            const count = await RolePermission.countDocuments(rolePermission);
            if (count === 0) {
                const access = await RolePermission.create(rolePermission);
            }
        }
        return { status: "success" };
    } catch (e) {
        console.log(e.message);
    }
}

export async function seedTopics() {
    try {
        const TOPICS = [
            { displayName: 'Staff approval notifications', genericName: 'approve-staff' },
            { displayName: 'Role approval notifications', genericName: 'approve-role' },
            { displayName: 'Transaction maker notifications', genericName: 'transaction-maker' },
            { displayName: 'Transaction checker notifications', genericName: 'transaction-checker' },
        ];
        TOPICS.forEach(async (topic) => {
            const topicsInfo = {
                genericName: topic.genericName
            };
            const count = await Topics.countDocuments(topicsInfo);
            if (count === 0) {
                const createdTopic = await Topics.create(topic);
            }
        });
    } catch (e) {
        console.log(e.message);
    }
}
async function cleanData() {
    try {
        //const user = await User.deleteOne({ email: staff.email });
        //const permission = await Permission.collection.drop();
        //onst role = await Role.collection.drop();
        const status = await Transaction.collection.drop();
        console.log('deleted Transaction: ');

    } catch (e) {
        return {
            userMessage: 'Whoops! Something went wrong.',
            developerMessage: e.message,
        };
    }
}