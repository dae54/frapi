const Request = require('./requests.model')
const User = require('../users/user.model')
const RequestAproves = require('./requestAproves.model')
const Notifications = require('../Notifications/notification.controller')
const Roles = require('../AccessControl/roles.model')
const Settings = require('../Settings/settings.model')

const budgetItemAmountDetails = require('../../services/BudgetItemAmountDetails').BudgetItemAmountDetails
// const createRequestNotification = require('../Notifications/notification.controller').createRequestNotification
const generateRequestStatistics = require('../../services/generateRequestStatistics').requestStatistics
module.exports = {
    createNewRequest: async (req, res) => {
        try {
            //TODO Check if there is a similar request entry before saving data
            console.log('create new request')
            const { budgetItemId, budgetId, description, amount, userId } = req.body
            const request = new Request({
                budgetItemId, userId, description, amount, budgetId
            })
            const newRequest = await request.save()
            const fundAproverRole = await Roles.find({ name: 'Fund Aprover' }).select('_id')
            const fundAprovers = await User.find({ role: fundAproverRole }).select('_id')
            // rename _id to recepientID
            var recepients = fundAprovers.map(fundAprover => {
                return { recepientID: fundAprover._id }
            })
            await Notifications.storeNotification({ createdBy: userId, recepients, subject: 'New Request', requestId: newRequest._id })

            // if (fundAprovers.length != 0) {
            //     fundAprovers.forEach(async fundAprover => {
            //         await Notifications.storeNotification({ createdBy: userId, recepient: fundAprover, subject: 'New Request', requestId: newRequest._id })
            //     })
            // } else {
            //     // const adminRoleId = await Roles.find({ name: 'Administrator' }).select('_id')
            //     // const admin = await User.find({ roleId: adminRoleId }).select('_id')
            //     // console.log(admin[0])
            //     await Notifications.storeNotification({ createdBy: userId, subject: 'New Request', requestId: newRequest._id })
            // }
            return res.status(200).json({
                message: 'You have successully created a request',
                status: true,
                data: newRequest
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({
                userMessage: 'Whoops something went wrong',
                developerMessage: e.message
            })
        }
    },
    viewRequestById: async (req, res) => {
        try {
            console.log('viewRequestById')
            // console.log(req.params.id)
            const request = await Request.findOne({ _id: req.params.id })
                .populate('userId', 'firstName lastName')
                .populate('budgetItemId', 'name code')
                .populate('budgetId', 'name')
            // const budgetItemAmounts = await budgetItemAmountDetails(request.budgetItemId._id);
            return res.status(200).json({
                message: 'done',
                status: true,
                data: request,
            })
        } catch (e) {
            return res.status(400).json({
                userMessage: 'Whoops something went wrong.. see you',
                developerMessage: e.message
            })
        }
    },
    viewRequestByUserId: async (req, res) => {
        try {
            console.log('viewRequestByUserId')
            // console.log(req.params.id)
            const request = await Request.find({ userId: req.params.id })
                .select('createdAt budgetItemId description amount status')
                .populate('budgetItemId', 'name code -_id')
                .sort('-createdAt')
            // console.log(request)BudgetItemAmountDetails
            // const budgetItemAmounts = await budgetItemAmountDetails(request.budgetItemId._id);
            return res.status(200).json({
                message: 'done',
                status: true,
                data: request,
            })
        } catch (e) {
            return res.status(400).json({
                userMessage: 'Whoops something went wrong.. see you',
                developerMessage: e.message
            })
        }
    }, viewRequestByBudgetId: async (req, res) => {
        try {
            console.log('viewRequestByBudgetId')

            const key = req.query.identifier
            let finder = { budgetId: req.params.id }

            if (key) {
                let value = req.query.value
                key === 'status' && (value = Number(req.query.value))
                let finderTemp = { [key]: value }
                finder = Object.assign(finder, finderTemp) //merge the objects
            }
            let request;
            if (req.query.select) {
                request = await Request.find(finder)
                    .select(req.query.select)

            } else {
                request = await Request.find({ budgetId: req.params.id, status: req.query.status })
            }

            // .select('createdAt budgetItemId description amount status')
            // .populate('budgetItemId', 'name code -_id')
            // .sort('-createdAt')


            console.log(request)
            // BudgetItemAmountDetails
            // const budgetItemAmounts = await budgetItemAmountDetails(request.budgetItemId._id);
            return res.status(200).json({
                message: 'done',
                status: true,
                data: request,
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({
                userMessage: 'Whoops something went wrong.. see you',
                developerMessage: e.message
            })
        }
    },
    // getBudgetItemInfo: async (req, res) => {
    //     try {
    //         console.log('viewRequestVSBudgetInfo')
    //         const request = await Request.findOne({ _id: req.params.requestId }).populate('budgetItemId');
    //         const budgetItemAmounts = await budgetItemAmountDetails(request.budgetItemId._id);

    //         // console.log(request)BudgetItemAmountDetails
    //         // const budgetItemAmounts = await budgetItemAmountDetails(request.budgetItemId._id);
    //         return res.status(200).json({
    //             message: 'done',
    //             status: true,
    //             data: budgetItemAmounts
    //         })
    //     } catch (e) {
    //         return res.status(400).json({
    //             userMessage: 'Whoops something went wrong.. see you',
    //             developerMessage: e.message
    //         })
    //     }
    // },
    viewRequests: async (req, res) => {
        /**
         * THIS FUNCTION CAN :-
         * 1. FETCH SINGLE REQUEST (BY ID) <all or some properties>,
         * 2. FETCH MULTIPLE REQUESTS, SELECT depending on the params
         * POSSIBLE PARAMETERS
         * IN @param req.query,
         * @param select, expected: [ARRAY OF ATTRIBUTES TO BE SELECTED]
         * @param identifier, expected: [SINGLE NAMED PARAMETER THAT IS USED FOR SEARCHING]
         * @param value, expected: [SINGLE NAMED VALUE CARRYING THE VALUE OF @param identifier ]
         * 
         */
        try {
            console.log('view requests')
            console.log(req.query)

            const key = req.query.identifier
            var finder = new Object();
            if (key) {
                let value = req.query.value
                key === 'status' && (value = Number(req.query.value))
                finder = { [key]: value }
            }

            // console.log(finder)

            let request;
            if (req.query.select) {
                request = await Request.find(finder)
                    .populate('userId', 'firstName lastName -_id')
                    .select(req.query.select)
                    .limit(Number(req.query.limit))
            } else {
                request = await Request.find()
                    .populate('budgetItemId', 'name code')
                    .populate('userId', 'firstName lastName')
                    .populate('budgetId', 'name')
                    .sort('-createdAt')
                    .limit(Number(req.query.limit))
            }
            // if (req.query.select) {
            //     if (req.query.status) {
            //         console.log('have status')
            //         let requestTemp = await Request.find({ status: req.query.status })
            //             .select(req.query.select)
            //             .limit(Number(req.query.limit))
            //         request = { statusSortedRequest: requestTemp }
            //     } else {
            //         console.log('no status')
            //         let requestTemp = await Request.find()
            //             .select(req.query.select)
            //             .populate('userId', 'firstName lastName -_id')
            //             .limit(Number(req.query.limit))
            //         request = { fewParamsRequest: requestTemp }
            //     }
            // } else {
            //     request = await Request.find()
            //         .populate('budgetItemId', 'name code')
            //         .populate('userId', 'firstName lastName')
            //         .populate('budgetId', 'name')
            //         .sort('-createdAt')
            //         .limit(Number(req.query.limit))
            // }
            res.status(200).json({
                status: true,
                message: 'success',
                data: request
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    }, fetchRemarks: async (req, res) => {
        try {
            console.log('fetch remarks')

            const remarks = await Request.findById(req.query.requestId)
                .select('remarks -_id')
                .populate('remarks.author', 'firstName lastName')
                .sort('-remarks.createdAt')
            return res.status(200).json({
                status: true,
                message: 'success',
                data: remarks
            })

        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }

    }, addRemarks: async (req, res) => {
        try {
            console.log('add remark')
            const { remark, userId, requestId } = req.body
            const request = await Request.findById(requestId)
            request.remarks.push({ title: '', message: remark, author: userId })
            request.save()


            // const filter = { _id: req.body.requestId }
            // const update = {
            //     remarks: {
            //         message: req.body.remark,
            //         author:req.body.userId,
            //         title:''
            //     }
            // }

            // const redd = await Request.findOneAndUpdate(filter, update, {
            //     new: true, useFindAndModify:false
            // }).select('remarks -_id').populate('remarks')


            return res.status(200).json({
                status: true,
                message: 'success',
                data: request.remarks.slice(0).pop()
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    }, deleteRemark: async (req, res) => {
        try {
            let request = await Request.findById(req.params.requestId)
            request.remarks.splice(
                request.remarks.findIndex(remark => remark._id == req.params.remarkId), 1
            )
            request.save()

            return res.status(200).json({
                message: 'deleted',
                status: true
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    }, addAttachment: async (req, res, next) => {
        try {
            console.log('add attachment')
            // const url = req.protocol + '://' + req.get('host')
            const request = await Request.findOne({ _id: req.body.requestID })
            request.attachments.push({ name: req.file.filename, mimetype: req.file.mimetype })
            request.save()
            // console.log(request.attachments)
            // var arr = [1,2,3,4,5]
            // console.log(arr.slice(0).pop())
            // console.log(arr)

            return res.status(200).json({
                status: true,
                message: 'success',
                data: request.attachments.slice(0).pop()
            })
        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    }, getAttachments: async (req, res) => {
        try {
            const attachments = await Request.findOne({ _id: req.params.requestID }).select('attachments')
            return res.status(200).json({
                status: true,
                message: 'success',
                data: attachments
            })
        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    },
    deleteRequest: async (req, res) => {
        try {
            console.log('delete')
            await Request.deleteOne({ _id: req.params.id })
            res.status(200).json({
                message: 'deleted',
                status: true
            })
        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    },
    aproveRequest: async (req, res) => {
        try {
            console.log('aprove request')
            //TODO: to limit that no user can aprove more than once per request
            const { userId } = req.body
            const requestID = req.params.requestID
            const aprovedRequestsCount = await RequestAproves.find({ requestId: requestID }).countDocuments()
            console.log(aprovedRequestsCount)
            // const fundAproversCount = GeneralSettings
            const fundAproversCount = await Settings.findOne({ name: 'fundAprovers' }).select('value -_id')
            console.log(fundAproversCount)

            if (aprovedRequestsCount < fundAproversCount.value - 1) {
                let requestAproves = new RequestAproves({
                    userId, requestId: requestID
                })
                await requestAproves.save()
                return res.status(201).json({
                    status: false,
                    message: 'aprove successfully added',
                    data: { status: 0, requestAproves: aprovedRequestsCount + 1 }
                })
            } else if (aprovedRequestsCount === fundAproversCount.value - 1) {
                const aprovedRequest = await Request.findOneAndUpdate({ _id: requestID }, { $set: { status: 2, statusChangedBy: userId } }, { new: true, useFindAndModify: false })

                // const aprovedRequest = await Request.findOneAndUpdate(
                //     { _id: requestID },
                //     {
                //         $set: { status: 2 },
                //         $push: {
                //             statusChangedBy: {
                //                 user: userId, fromStatus: 0, toStatus: 2, reason: 'Aproving Request'
                //             }
                //         }
                //     },
                //     { new: true, useFindAndModify: false })
                //     .populate('budgetItemId', 'name code')
                // const asd = await RequestAproves.deleteMany({ requestId: requestID })
                await RequestAproves({ userId, requestId: requestID }).save()
                // await requestAproves.save()
                const asd = await RequestAproves.updateMany({ requestId: requestID }, { status: 1 })
                console.log(asd)

                console.log(aprovedRequest)
                // await Notifications.storeNotification({ createdBy: userId, recepient: aprovedRequest.userId, onModel: 'users', subject: 'Request Aproved', requestId })

                return res.status(201).json({
                    status: true,
                    message: 'set to Aproved status',
                    data: { status: aprovedRequest.status }
                })
            } else {
                const requestStatus = await Request.findOne({ _id: requestID }).select('status')
                return res.status(201).json({
                    status: false,
                    message: 'maximum number of request aproves reached',
                    data: { status: requestStatus }
                })
            }
        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops something went wrong',
                developerMessage: e.message
            })
        }
    },
    revertAprove: async (req, res) => {
        try {
            const requestID = req.params.requestID
            const { userId, remarks } = req.body

            const del = await RequestAproves.deleteMany({ requestId: requestID })

            // const request = await Request.findOne({ _id: requestID })
            // request.status = 0
            // request.statusChangedBy = userId
            // request.remarks.push({ title: 'Revert Request', message: remarks, author: userId })
            // request.save()

            // const updatedRequestFinal = await Request.findOne({ _id: requestID })
            //     .populate('userId', 'firstName lastName')
            //     .populate('budgetItemId', 'name code')
            //     .populate('budgetId', 'name')


            const request = await Request.findOneAndUpdate(
                { _id: requestID },
                {
                    $set: {
                        status: 0,
                        statusChangedBy: userId
                    },
                    $push: {
                        remarks: {
                            title: 'Revert Request', message: remarks, author: userId
                        }
                    }
                }, { new: true, useFindAndModify: false })
                .populate('userId', 'firstName lastName')
                .populate('budgetItemId', 'name code')
                .populate('budgetId', 'name')

            return res.status(200).json({
                status: true,
                message: 'Request Reverted Successfully',
                data: request
            })
            // request.statusChangedBy = userId
            // request.remarks.push({ title: '', message: remarks, author: userId })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                userMessage: 'Whoops something went wrong',
                developerMessage: e.message
            })
        }
    },
    getRequestAproves: async (req, res) => {

        console.log('get request aproves')
        const requestID = req.params.requestID
        console.log(req.params)
        // if(req.params.requestID )
        console.log(typeof req.params.requestID)
        try {
            if (req.params.requestID !== undefined) {
                const requestAproves = await RequestAproves.find({ requestId: requestID })

                return res.status(200).json({
                    status: true,
                    message: 'done fetching request aproves',
                    data: {}
                })
            } else {
                console.log('hah')
                const requestAproves = await RequestAproves.find()
                    .select('-updatedAt -__v')
                    // .populate('userId', 'firstName lastName roleId')
                    .populate({
                        path: 'userId',
                        select: 'firstName lastName roleId ',
                        populate: { path: 'roleId', select: 'name -_id' }
                    })
                    .populate({
                        path: 'requestId',
                        select: 'budgetItemId userId createdAt status budgetId',
                        populate: [
                            { path: 'budgetItemId', select: 'code name' },
                            { path: 'userId', select: 'firstName lastName' },
                            { path: 'budgetId', select: 'name' },
                        ],
                        // populate: { path: 'userId', select: 'firstName lastName' },
                    })
                // .populate({ path: 'requestId', populate: { path: 'budgetItemId userId' }})

                // populate: { path: 'userId amount status budgetItemId' } })
                // .populate('userId', 'firstName lastName')
                // .populate('requestId', 'userId amount status budgetItemId')

                console.log(requestAproves)
                return res.status(200).json({
                    status: true,
                    message: 'done fetching request aproves',
                    data: requestAproves
                })
            }
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                userMessage: 'Whoops something went wrong',
                developerMessage: e.message
            })
        }

    },
    changeRequestStatus: async (req, res) => {
        try {
            const { requestId, status } = req.params
            console.log('changeRequestStatus')
            const { userId, remarks } = req.body
            const request = await Request.findOne({ _id: requestId });
            /**updated status
             * 0 pending
             * 1 OnHold
             * 2 Approved
             * 3 Rejected
             * 4 Disbursed
             * 5 Confirmed
             * 6 Cancelled
             */
            let updatedRequest;
            switch (status) {
                case '0':
                    request.status = 0
                    request.statusChangedBy = userId
                    updatedRequest = await request.save({ new: true })
                    break;
                case '1':
                    request.status = 1
                    request.statusChangedBy = userId
                    request.remarks.push({ title: '', message: remarks, author: userId })
                    updatedRequest = await request.save({ new: true })
                    break;
                case '3':
                    request.status = 3
                    request.statusChangedBy = userId
                    request.remarks.push({ title: '', message: remarks, author: userId })
                    updatedRequest = await request.save({ new: true })
                    break;
                case '4':
                    request.status = 4
                    request.statusChangedBy = userId
                    updatedRequest = await request.save()
                    break;
                case '5':
                    request.status = 5
                    request.statusChangedBy = userId
                    updatedRequest = await request.save()
                    break;
                case '6':
                    request.status = 6
                    request.statusChangedBy = userId
                    updatedRequest = await request.save()
                    break;
                default:
                    return res.status(400).json({
                        status: false,
                        userMessage: 'Whoops! Something went wrong.',
                        developerMessage: `Status '${status}' not defined`
                    })
            }
            const updatedRequestFinal = await Request.findOne({ _id: requestId })
                .populate('userId', 'firstName lastName')
                .populate('budgetItemId', 'name code')
                .populate('budgetId', 'name')

            console.log(updatedRequestFinal)
            return res.status(200).json({
                status: true,
                message: `status successfully changed to ${status}`,
                // data: { status: updatedRequest.status, remarks: updatedRequest.remarks.pop() }
                data: updatedRequestFinal
            })

        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    },
    requestStatistics: async (req, res) => {
        try {
            const requestStats = await generateRequestStatistics()
            return res.status(200).json({
                message: 'done',
                data: requestStats
            })
            /**things to populate here**
             * total pending requests and its total amount //
             * total hold requess and its total amount //
             * most requested budgetItem //
             * total requested amount (per budget period) 
             */
        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong here.',
                developerMessage: e.message
            })
        }
    },
    requestStatusAmount: async (req, res) => {
        var pendingSum = 0, holdSum = 0, activeSum = 0, aprovedSum = 0, disbursedSum = 0, cancelledSum = 0
        const requestsPending = await Request.find({ status: 0 }).select('amount')
        const requestsOnHold = await Request.find({ status: 1 }).select('amount')
        const requestsActive = await Request.find({ status: 2 }).select('amount')
        const requestsAproved = await Request.find({ status: 3 }).select('amount')
        const requestsDisbursed = await Request.find({ status: 4 }).select('amount')
        const requestsCancelled = await Request.find({ status: 5 }).select('amount')
        // console.log(requestsPending)
        requestsPending.forEach(item => {
            pendingSum = pendingSum + item.amount
        })
        // console.log(pendingSum)
        requestsOnHold.forEach(item => {
            holdSum = holdSum + item.amount
        })
        requestsActive.forEach(item => {
            activeSum = activeSum + item.amount
        })
        requestsAproved.forEach(item => {
            aprovedSum = aprovedSum + item.amount
        })
        requestsDisbursed.forEach(item => {
            disbursedSum = disbursedSum + item.amount
        })
        requestsCancelled.forEach(item => {
            cancelledSum = cancelledSum + item.amount
        })
        // PREPARE THE RESPONSE
        const requestStats = [
            {
                title: 'pending',
                amount: pendingSum
            },
            {
                title: 'OnHold',
                amount: holdSum
            },
            {
                title: 'Active',
                amount: activeSum
            },
            {
                title: 'Aproved',
                amount: aprovedSum
            },
            {
                title: 'Disbursed',
                amount: disbursedSum
            },
            {
                title: 'Cancelled',
                amount: cancelledSum
            }
        ]
        return res.status(200).json({
            message: 'done',
            data: requestStats
        })
    },
    requestHistory: async (req, res) => {
        try {
            console.log('request history')
            const requests = await Request.find()
            // console.log(requests)
            let categories = []
            let data = []
            requests.map(item => {
                categories.push(new Date(item.createdAt).toLocaleTimeString())
                data.push(item.amount)
                // console.log(item.amount)
                // console.log(new Date(item.createdAt).toLocaleDateString())
                // console.log(new Date(item.createdAt).toLocaleTimeString())
            })
            return res.status(200).json({
                message: 'done',
                data: { categories, data }
            })
        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong here.',
                developerMessage: e.message
            })
        }
    }
}