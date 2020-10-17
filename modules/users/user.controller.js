const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
let User = require('./user.model')
const sendEmail = require('../../services/invitationEmail/invitaionEmail')
const sendResetPasswordEmail = require('../../services/resetPasswordEmail/resetPasswordEmail')

module.exports = {
    login: async (req, res) => {
        try {
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(401).json({
                    target: 'email',
                    userMessage: 'Sorry Email not registered',
                    developerMessage: 'Email not registered'
                });
            }
            else {
                let passwordIsValid = await bcrypt.compareSync(req.body.password, user.password);
                if (!passwordIsValid) {
                    return res.status(401).json({
                        target: 'password',
                        userMessage: 'Wrong Password',
                        developerMessage: 'wrong password'
                    })
                }
                else {
                    const displayName = user.firstName + ' ' + user.lastName
                    let token = jwt.sign({ id: user._id, email: user.email, displayName: displayName }, process.env.JWT_SECRET, { expiresIn: 86400 });
                    let rawResponse = user.toObject()
                    delete rawResponse.password
                    return res.status(200).json({
                        message: "Logged in successfully",
                        data: {
                            token: token,
                            user: rawResponse
                        }
                    })
                }
            }
        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    },
    register: async (req, res) => {
        try {
            const { firstName, lastName, email, phoneNumber, country, region, district, ward, gender, roleId } = req.body.newUser
            const emailCount = await User.find({ email: email }).countDocuments();
            if (emailCount != 0) {
                return res.status(400).json({
                    userMessage: 'Email Already Taken',
                    developerMessage: 'Duplicated Email'
                })
            }
            var user = new User({
                firstName, lastName, email, phoneNumber, country, region, district, ward, gender, roleId
            })
            const password = lastName.toUpperCase()
            var hash = bcrypt.hashSync(password, 8);
            user.password = hash
            var newUser = await user.save()
            newUser = newUser.toObject()
            delete newUser.password
            const response = await sendEmail(firstName, lastName, email)
            if (response.status) {
                return res.status(200).json({
                    message: `account created successfully, Invitation email sent to ${email}`,
                    data: newUser
                })
            } else {
                return res.status(200).json({
                    message: 'Account created successfully, but invitation email failed to be sent. Check your connectivity',
                    data: newUser,
                    developerMessage: response.message
                })
            }
        } catch (e) {
            return res.status(500).json({
                status: false,
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    },
    editUser: async (req, res) => {
        try {
            console.log('edit user')
            const { firstName, lastName, email, phoneNumber, country, region, district, ward, gender, roleId, userId } = req.body.updatedUser
            const updatedUser = await User.findByIdAndUpdate(userId, { $set: { firstName, lastName, email, phoneNumber, country, region, district, ward, gender, roleId } }, { new: true, useFindAndModify: false })
            let rawResponse = updatedUser.toObject()
            delete rawResponse.password
            return res.status(200).json({
                message: `user updated successfully`,
                data: rawResponse
            })
        } catch (e) {
            return res.status(500).json({
                status: false,
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    },
    changePassword: async (req, res) => {
        try {
            const { password, userId } = req.body
            let encryPassword = bcrypt.hashSync(password, 8);
            await User.updateOne({ _id: userId }, { password: encryPassword, firstTimeLoginStatus: 1, forgotPasswordID: '' });
            res.status(201).json({
                message: 'you have successfully changed the password, Login to proceed',
                data: { status: true }
            })
        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    },
    deleteUser: async (req, res) => {
        try {
            if (req.body.userId === req.params._id) {
                return res.status(400).json({
                    userMessage: 'You cant delete Yourself',
                    developerMessage: `userId ${req.params._id} is yourself`
                })
            } else if (req.params._id === '5d9b084df394aa558947fa5d') {
                return res.status(400).json({
                    userMessage: 'You cant delete admin',
                    developerMessage: `demote ${req.params._id} as an admin before deleting`
                })
            }
            const deletedUser = await User.findOneAndDelete(req.params)
            return res.status(200).json({
                message: 'deleted',
                status: true,
                data: deletedUser
            })
        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    },
    viewUser: async (req, res) => {
        try {
            console.log('viewUser')
            const user = await User.find().populate('roleId', 'name')
                .select('firstName lastName phoneNumber roleId')
            return res.status(200).json({
                message: 'done',
                status: true,
                data: user
            })
        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    },
    viewUserById: async (req, res) => {
        try {
            console.log('viewUserById')
            console.log(req.params.id)
            const user = await User.findById(req.params.id).select('-password').populate('roleId', 'name')
            console.log(user)
            const userOBJ = user.toObject()
            userOBJ.roleName = user.roleId.name
            userOBJ.roleId = user.roleId._id
            console.log(userOBJ)

            return res.status(200).json({
                message: 'done',
                status: true,
                data: userOBJ
            })
        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    }
    , forgotPassword: async (req, res) => {
        try {
            function makeId(length) {
                var result = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for (var i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }
            console.log('forgot password')
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                const { firstName, lastName, email } = user
                const userId = user._id;

                const resetPasswordID = makeId(6)
                const response = await sendResetPasswordEmail(firstName, lastName, email, resetPasswordID)

                await User.updateOne({ _id: userId }, { forgotPasswordID: resetPasswordID });
                if (response.status) {
                    return res.status(200).json({
                        message: `verification code is sent via your email`,
                        data: {}
                    })
                } else {
                    return res.status(200).json({
                        message: 'Email with verification code failed to be sent. Check your connectivity',
                        data: { resetPasswordID },
                        developerMessage: response.message
                    })
                }
            } else {
                return res.status(406).json({
                    userMessage: 'Email appears to have not been registered',
                    developerMessage: 'invalid email'
                })
            }
        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    }, verifyCode: async (req, res) => {
        const { code } = req.body
        try {
            let user = await User.findOne({ forgotPasswordID: code })
            if (user.length === 0) {
                return res.status(500).json({
                    userMessage: 'Invalid code provided.',
                    developerMessage: `${code} is invalid`
                })
            }
            req.body.userId = user._id
            module.exports.changePassword(req, res)
        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    }
}