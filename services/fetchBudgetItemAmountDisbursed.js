const mongoose = require('mongoose')
const Request = require('../modules/Requests/requests.model')
const Budgets = require('../modules/Budgets/budget.model')

module.exports = {
    fetchBudgeItemAmountDisbursed: async (budgetItemId, budgetId) => {
        // console.log(caseNo)
        // if (caseNo === 1) {
        //     console.log('object')
        //     // FETCHING OF BUDGET DETAILS FOR ONLY BUDGET TIME (ACTIVE BUDGETS)
        //     // console.log('xxxxxxxxxx')
        //     // get id of active budget
        //     // const activeBudget = await Budgets.find({ status: 1 });
        //     // console.log(activeBudget)
        //     // const budgetId = activeBudget._id;
        //     console.log(budgetItemId)
        //     // console.log(budgetItemId)
        //     const amountOfBudgetItemDisbursed = await Request.aggregate([
        //         { $match: { $and: [{ status: 4, budgetId: budgetId }, { budgetItemId: mongoose.Types.ObjectId(budgetItemId) }] } },
        //         { $group: { _id: '$budgetItemId', totalDisbursedAmount: { $sum: '$amount' } } }
        //     ]);
        //     if (amountOfBudgetItemDisbursed.length === 0) {
        //         return 0
        //     }
        //     return amountOfBudgetItemDisbursed[0].totalDisbursedAmount
        // } else {
        // GENERAL FETCHING OF BUDGETS INFO (ALL OVER THE TIME)
        // console.log('xxxxxxxxxx')
        const amountOfBudgetItemDisbursed = await Request.aggregate([
            { $match: { $and: [{ status: 4, budgetId: mongoose.Types.ObjectId(budgetId) }, { budgetItemId: mongoose.Types.ObjectId(budgetItemId) }] } },

            { $group: { _id: '$budgetItemId', totalDisbursedAmount: { $sum: '$amount' } } }
        ]);

        if (amountOfBudgetItemDisbursed.length === 0) {
            return 0
        }
        return amountOfBudgetItemDisbursed[0].totalDisbursedAmount
    }
    // }
}