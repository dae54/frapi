let BudgetItem = require('./budgetItems.model')
let Request = require('../Requests/requests.model')
let Budget = require('../Budgets/budget.model')
let budgetItemDisbursed = require('../../services/fetchBudgetItemAmountDisbursed').fetchBudgeItemAmountDisbursed
const BudgetItemAmountDetails = require('../../services/BudgetItemAmountDetails').BudgetItemAmountDetails

module.exports = {
    createBudgetItems: async (req, res) => {
        try {
            // console.log(req.body)
            var budgetItem;
            const { name, code, description } = req.body
            const itemCount = await BudgetItem.find({ code }).countDocuments();
            // console.log(itemCount)
            if (itemCount > 0) {
                // console.log('here')
                return res.status(400).json({
                    userMessage: `Budget Item with code "${code}" already exists`,
                    developerMessage: `duplicate entry ${code} in budgetItemCode`
                })
            }
            budgetItem = new BudgetItem({
                name, code, description
            })
            const newBudgetItem = await budgetItem.save()

            res.status(200).json({
                status: true,
                message: `Budget item with code ${code} is successfully created`,
                data: newBudgetItem
            })
        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    },
    viewBudgetItems: async (req, res) => {
        try {
            let budgetItem
            if (req.params.length != undefined) {
                budgetItem = await BudgetItem.find({ _id: req.params.budgetItemId });
            } else {
                budgetItem = await BudgetItem.find().select('name code');
            }
            return res.status(200).json({
                message: 'success',
                data: budgetItem
            })
        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    },
    deleteBudgetItem: async (req, res) => {
        try {
            console.log('delete budget item')
            BudgetItem.deleteOne({ code: req.body.code }, function (err) {
                if (err) return res.status(400).json({
                    userMessage: 'Failed to delete Entry',
                    developerMessage: e.message
                })
            });
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
    budgetItemAmountDetails: async (req, res) => {
        try {
            console.log('get budget item amount details')
            const budgetId = req.query.budgetId;
            console.log(req.query)
            // let confirmedRequest = await Request.find({ status: 5 })
            const budgetItemAmount = await BudgetItemAmountDetails(req.params.budgetItemId, budgetId)
            // const budget = await Budget.find({ status: 1 }).populate('budgetDetails.budgetItemId');
            // const budget = await Budget.findById({ budgetId }).select('name startDate')
            const budget = await Budget.findOne({ _id: budgetId }).select('name startDate status');
            console.log(budget)

            res.status(200).json({
                message: 'done',
                data: budgetItemAmount, budget
            })
            // confirmedRequest.forEach((item)=>{
            //     console.log(item.amount)
            // })
            // let budgetItem = await BudgetItem.find({});
            // budgetItem.forEach((item) => {
            //     confirmedRequest.forEach((request) => {
            //         if (request.budgetItemCode === item.code) {

            //             console.log(item)
            //             console.log(request)
            //         }
            //     })
            // })
            // for (var i = 0; i < budgetItem.length; i++) {
            //     // console.log(budgetItem[i].code)
            //     for (var j = 0; j < confirmedRequest.length; j++) {
            //         // console.log('*'+confirmedRequest[j].budgetItemCode)

            //         if (budgetItem[i].code === confirmedRequest[j].budgetItemCode) {
            //             console.log(budgetItem[i].code)
            //             console.log(confirmedRequest[j].amount)
            //             //     console.log(confirmedRequest[request])
            //             // break;
            //         }
            //     }
            // }

        } catch (e) {
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: e.message
            })
        }
    }, budgetItemNameAmount: async (req, res) => {
        try {
            console.log('get budgetItemNameAmount')
            const budget = await Budget.findById(req.params.budgetId).populate('budgetItems.budgetItemId');
            // console.log(budget.budgetItems)
            var data = [];
            for (var i = 0; i < budget.budgetItems.length; i++) {
                var disbursedAmount = await budgetItemDisbursed(budget.budgetItems[i].budgetItemId._id, req.params.budgetId)
                var datas = {
                    title: budget.budgetItems[i].budgetItemId.name,
                    code: budget.budgetItems[i].budgetItemId.code,
                    value: disbursedAmount,
                    total: budget.budgetItems[i].amount
                }
                data.push(datas)
            }
            return res.status(200).json({
                data: {
                    data,
                    budgetName: budget.name
                }
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
//TODO: create a budgetItem code generator

/**
 * to get item balance using suggested method
 * 1. fetch all confirmed requests
 * here yo'll have an array of many items
//  * find all budget items
 * iterate through all items
 */