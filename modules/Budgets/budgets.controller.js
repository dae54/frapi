const Budget = require('./budget.model')
const Request = require('../Requests/requests.model')
const mongoose = require('mongoose')
const moment = require('moment')
const Notification = require('../Notifications/notification.controller')

module.exports = {
    createBudget: async (req, res) => {
        try {
            console.log('create budget')
            req.body.newBudget.createdBy = req.body.userId
            const newBudget = await new Budget(req.body.newBudget).save()
            res.status(201).json({
                data: newBudget,
                message: 'budget successfully created'
            })
        } catch (e) {
            console.log(e)
            var message = ''
            if (e.code === 11000) {
                message = `Budget with name "${e.keyValue.name.toUpperCase()}" already exist`
            }
            // console.log(message)
            return res.status(500).json({
                userMessage: message,
                developerMessage: e.message
            })
        }
    },
    addBudgetItemsToBudget: async (req, res) => {
        try {
            const budgetItemAndValue = req.body.newBudget.budgetItemAndValue
            const status = req.body.newBudget.status
            // UPDATE THE STATUS OF BUDGET
            let budget = await Budget.findOneAndUpdate({ _id: req.body.newBudget.budgetId }, { status: status }, { new: true });
            // ADD BUDGET ITEMS TO BUDGET
            budget.budgetItems = budgetItemAndValue

            await budget.save()
            return res.status(200).json({
                data: { message: 'done' },
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong',
                developerMessage: e.message
            })
        }
    },
    budgetNamesList: async (req, res) => {
        try {
            console.log('budget names list')
            const budgetNamesList = await Budget.find().select('name')
            res.status(200).json({
                message: 'success',
                data: budgetNamesList
            })
        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    },
    viewBudget: async (req, res) => {
        /**
         * THIS FUNCTION CAN :-
         * 1. FETCH SINGLE BUDGET (BY ID) <all or some properties>,
         * 2. FETCH MULTIPLE BUDGETS, SELE depending on the params
         * POSSIBLE PARAMETERS
         * IN @param req.query,
         * @param select, expected: [ARRAY OF ATTRIBUTES TO BE SELECTED]
         * @param identifier, expected: [SINGLE NAMED PARAMETER THAT IS USED FOR SEARCHING]
         * @param value, expected: [SINGLE NAMED VALUE CARRYING THE VALUE OF @param identifier]
         * 
         * req.params ==> budget id @alias budgetId
         * req.query  ==> select parameters @alias select object
         */

        try {
            console.log('view budget')

            const key = req.query.identifier
            var finder = new Object();
            if (key) {
                finder = { [key]: req.query.value }
            }

            var budget;
            if (req.query.select) {
                budget = await Budget.find(finder)
                    .populate('budgetItems.budgetItemId')
                    // .populate('createdBy', 'firstName lastName')
                    // .populate('activatedBy', 'firstName lastName createdAt')
                    .select(req.query.select)
                    // .populate('budgetItems.budgetItemId')

                    .sort('-createdAt')
            } else {
                budget = await Budget.find(finder)
                    .populate('budgetItems.budgetItemId')
                    .populate('createdBy', 'firstName lastName')
                    .populate('activatedBy', 'firstName lastName createdAt')
                    .sort('-createdAt')
            }


            // console.log(budget)
            res.status(200).json({
                message: 'success',
                data: budget
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    },
    // viewBudgetById: async (req, res) => {
    //     try {
    //         /**
    //          * req.params ==> budget id @alias budgetId
    //          * req.query  ==> select parameters @alias select object
    //          */

    //         console.log('view budget By Id')
    //         console.log(req.params)
    //         // const ObjectId = mongoose.Types.ObjectId
    //         // if(new ObjectId(req.params.queryValue).toString()===req.params.queryValue){
    //         //     console.log('true')
    //         // }else{
    //         //     console.log('hell no')
    //         // }

    //         //this has to come from the helper function
    //         const budget = await Budget.findOne({ _id: mongoose.Types.ObjectId(req.params.budgetId) })
    //             .select(req.query.select)
    //             .populate('budgetItems.budgetItemId', 'name -_id')

    //         res.status(200).json({
    //             message: 'success',
    //             data: budget
    //         })
    //     } catch (e) {
    //         console.log(e)
    //         return res.status(500).json({
    //             userMessage: 'Whoops! Something went wrong.',
    //             developerMessage: e.message
    //         })
    //     }
    // },
    viewBudgetByStatus: async (req, res) => {
        try {
            // console.log(req)
            console.log('view budget ByStatus')
            // console.log(req.params)
            //this has to come from the helper function
            const budget = await Budget.find({ status: req.params.status })
                .select('name budgetItems')
                .populate({ path: 'budgetItems.budgetItemId', select: 'name description' });

            res.status(200).json({
                message: 'success',
                data: budget
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    },
    viewBudgetRequestsHist: async (req, res) => {
        try {
            console.log('viewBudgetRequestsHist')
            // console.log(req.query.budgetId)
            //this has to come from the helper function
            const budgetRequestsHist = await Request.find({ budgetId: mongoose.Types.ObjectId(req.query.budgetId) })
                .populate('budgetItemId')
                .sort('-createdAt')
            res.status(200).json({
                message: 'success',
                data: budgetRequestsHist
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    },
    deleteBudget: async (req, res) => {
        try {
            // console.log(req)
            await Budget.deleteOne({ _id: req.query.budgetId })
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
    },
    editBudget: async (req, res) => {
        try {
            console.log('edit budget')
            // console.log(req.params.target)
            let budget;
            if (req.params.target === 'budgetItems') {
                budget = await Budget.findById(req.body.row.budgetId).populate('budgetItems.budgetItemId')
                budget.budgetItems.forEach(item => {
                    if (item.budgetItemId._id.toString() === req.body.row._id) {
                        // console.log('item')
                        item.amount = req.body.row.amount
                    }
                })
                await budget.save()
            } else if (req.params.target === 'budgetName') {
                budget = await Budget.findByIdAndUpdate(req.body.data.budgetId, { $set: { name: req.body.data.name } }, { new: true, useFindAndModify: false }).populate('budgetItems.budgetItemId')
            } else if (req.params.target === 'description') {
                budget = await Budget.findByIdAndUpdate(req.body.data.budgetId, { $set: { description: req.body.data.description } }, { new: true, useFindAndModify: false }).populate('budgetItems.budgetItemId')
            }
            return res.status(200).json({
                message: 'updated successfully',
                data: budget
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    }, addItem: async (req, res) => {
        try {
            // console.log('add item')
            console.log(req.body)
            const { data } = req.body
            // var updatedBudget = await Budget.findOneAndUpdate({ _id: data.budgetId }, { $set: { status: newStatus } }, { new: true, useFindAndModify: false }).populate('budgetDetails.budgetItemId')
            var updatedBudget = await Budget.findById(data.budgetId)
            updatedBudget.budgetItems.push({ budgetItemId: data.budgetItemId, amount: data.amount })
            console.log(updatedBudget)
            updatedBudget.save()
            return res.status(200).json({
                message: 'updated successfully',
                data: updatedBudget
            })
        } catch (error) {

        }
    }, changeStatus: async (req, res) => {
        try {
            const { userId } = req.body
            const newStatus = req.params.status
            var updatedBudget;
            console.log('change status')
            // console.log(newStatus === '1')
            //check if the new status is 1 for activating or 0 for deactivating
            if (newStatus === '1') {
                const activeBudgetCount = await Budget.find({ status: 1 }).countDocuments();
                //check the number of active budgets
                if (activeBudgetCount === 0) {
                    updatedBudget = await Budget.findOneAndUpdate({ _id: req.params.budgetId }, { $set: { status: newStatus, activatedBy: userId, startDate: moment().format('MMM DD, YYYY'), endDate: moment().add(30, 'days').format('MMM DD, YYYY') } }, { new: true, useFindAndModify: false })
                        .populate('budgetItems.budgetItemId')
                        .populate('activatedBy', 'firstName lastName')
                        .populate('createdBy', 'firstName lastName')
                    console.log(updatedBudget)
                    return res.status(200).json({
                        message: 'status changed',
                        data: updatedBudget
                    })
                } else {
                    return res.status(400).json({
                        userMessage: 'Only 1 active budget allowed per given budget period',
                        developerMessage: `there are ${activeBudgetCount} active budgets. Only one can be active`
                    })
                }
            } else {
                updatedBudget = await Budget.findOneAndUpdate({ _id: req.params.budgetId }, { $set: { status: newStatus, statusChangedBy: userId, startDate: '-- -- -- --', endDate: '-- -- -- --' } }, { new: true, useFindAndModify: false })
                    .populate('budgetItems.budgetItemId')
                    .populate('activatedBy', 'firstName lastName')
                    .populate('createdBy', 'firstName lastName')
            }
            return res.status(200).json({
                message: 'status changed',
                data: updatedBudget
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    },
    validateBudgetName: async (req, res) => {
        try {
            console.log('validate budget name')
            // console.log(req.params.name)
            const budgetCount = await Budget.find({ name: req.params.name }).countDocuments();
            if (budgetCount == 0) {
                return res.status(200).json({
                    message: 'accepted',
                    data: budgetCount
                })
            } else {
                return res.status(200).json({
                    message: `Budge named as "${req.params.name}" already exists`,
                    data: budgetCount
                })
            }

        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    }, checkActive: async (req, res) => {
        try {
            const activeBudgetCount = await Budget.find({ status: 1 }).countDocuments();
            // console.log('helo',activeBudgetCount)
            if (activeBudgetCount === 0) {
                return res.status(200).json({
                    message: `active budgets count is '${activeBudgetCount}'`,
                    data: activeBudgetCount
                })
            } else {
                return res.status(200).json({
                    // message: `Sorry, No more than one active budget is allowed at a time. Deactivate the 'active budget' to enable INSTANT ACTIVATION`,
                    message: `Sorry, Only one active budget is allowed at a budget period. Deactivate the current active budget to enable instant ACTIVATION`,
                    data: activeBudgetCount,
                    developerMessage: `there are '${activeBudgetCount}' active budget(s), deactivate the budget to activate instantly`
                })
            }
        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    }, budgetDistribution: async (req, res) => {
        try {
            // data format
            /**
             * labels: ['Food', 'Transport', 'Quily', 'Watermelon'],
             * series:[100,200,300,100]
             */
            const budget = await Budget.find({ status: 1 }).populate('budgetItems.budgetItemId')
            var labels = [];
            var series = [];
            budget[0].budgetItems.map(item => {
                labels.push(item.budgetItemId.name)
                series.push(item.amount)
            })
            return res.status(200).json({
                message: 'done',
                data: { labels, series }
            })
        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    }, generateReport: async (req, res) => {
        try {
            /**
             * THIS ENDPOINT GENERATES REPORT
             * IT accepts @param { budgetId } in @param req.params 
             * 
             */
            const { budgetId } = req.params
            // console.log(budgetId)
            const budget = await Budget.findById(budgetId)
                .populate('budgetItems.budgetItemId', 'name code')
            // console.log(budget.budgetItems)

            const requests = await Request.find({ status: 4, budgetId: budgetId })
                .select('amount budgetItemId')

            var result = []

            budget.budgetItems.forEach(item => {
                var disbursed = 0;
                requests.forEach(request => {
                    // console.log(item.budgetItemId._id)
                    // console.log(request.budgetItemId)
                    // console.log(item.budgetItemId._id.toString() == request.budgetItemId.toString())
                    if (item.budgetItemId._id.toString() == request.budgetItemId.toString()) {
                        console.log('am in')
                        disbursed += request.amount
                        let temp = {
                            'budgetItem': item.budgetItemId,
                            'initialAmount': item.amount,
                            'disbursedAmount': disbursed,
                        }
                        result.push(temp)
                    } else {
                        let temp = {
                            'budgetItem': item.budgetItemId,
                            'initialAmount': item.amount,
                            'disbursedAmount': 0,
                        }
                        result.push(temp)
                    }
                })
                // console.log(item.budgetItemId)
            })

            // console.log('*************BUDGETITEMS*************')
            // console.log(budget.budgetItems)
            // console.log('*************BUDGETITEMS*************')


            // console.log('*************REQUEST*************')
            // console.log(requests)
            // console.log('*************REQUEST*************')

            // // console.log(requests)


            console.log('*************RESULT*************')
            console.log(result)
            console.log('*************RESULT*************')

            // var labels = [];
            // var series = [];
            // budget[0].budgetItems.map(item => {
            //     labels.push(item.budgetItemId.name)
            //     series.push(item.amount)
            // })
            return res.status(200).json({
                message: 'done',
                status: true,
                data: budget
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    }
}

