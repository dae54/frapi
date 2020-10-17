const mongoose = require('mongoose')
const Request = require('../modules/Requests/requests.model')
const Budgets = require('../modules/Budgets/budget.model')
const fetchBudgeItemAmountDisbursed = require('./fetchBudgetItemAmountDisbursed').fetchBudgeItemAmountDisbursed
module.exports = {
    BudgetItemAmountDetails: async (budgetItemId, budgetId) => {
        const initialBudgetItemAmount = await fetchInitialBudgetItemAmount(budgetItemId, budgetId);
        const budgeItemAmountAproved = await fetchBudgeItemAmountAproved(budgetItemId, budgetId);
        const budgeItemAmountDisbursed = await fetchBudgeItemAmountDisbursed(budgetItemId, budgetId);
        const finalResponse = {
            availableBudgetItemBalance: initialBudgetItemAmount - budgeItemAmountDisbursed,
            amountDisbursed: budgeItemAmountDisbursed,
            amountAproved: budgeItemAmountAproved
        }
        // console.log(finalResponse)
        return finalResponse;
    },
    //  fetchBudgeItemAmountDisbursed: async (budgetItemId, caseNo = 0) => {
    //     if (caseNo === 1) {
    //         // FETCHING OF BUDGET DETAILS FOR ONLY BUDGET TIME (ACTIVE BUDGETS)
    //         // console.log('xxxxxxxxxx')
    //         // get id of active budget
    //         const activeBudget = await Budgets.find({status:1});
    //         // console.log(activeBudget)
    //         // const budgetId = activeBudget._id;
    //         const amountOfBudgetItemDisbursed = await Request.aggregate([
    //             { $match: { $and: [{ status: 4, budgetId: activeBudget[0]._id }, { budgetItemId: mongoose.Types.ObjectId(budgetItemId) }] } },
    //             { $group: { _id: '$budgetItemId', totalDisbursedAmount: { $sum: '$amount' } } }
    //         ]);
    //         if (amountOfBudgetItemDisbursed.length === 0) {
    //             return 0
    //         }
    //         return amountOfBudgetItemDisbursed[0].totalDisbursedAmount
    //     } else {
    //         // GENERAL FETCHING OF BUDGETS INFO (ALL OVER THE TIME)
    //         console.log('xxxxxxxxxx')
    //         const amountOfBudgetItemDisbursed = await Request.aggregate([
    //             { $match: { $and: [{ status: 4 }, { budgetItemId: mongoose.Types.ObjectId(budgetItemId) }] } },
    //             { $group: { _id: '$budgetItemId', totalDisbursedAmount: { $sum: '$amount' } } }
    //         ]);
    //         if (amountOfBudgetItemDisbursed.length === 0) {
    //             return 0
    //         }
    //         return amountOfBudgetItemDisbursed[0].totalDisbursedAmount
    //     }

    // }
}

// async function fetchBudgeItemAmountDisbursed(budgetItemId) {
//     console.log('xxxxxxxxxx')
//     const amountOfBudgetItemDisbursed = await Request.aggregate([
//         { $match: { $and: [{ status: 4 }, { budgetItemId: mongoose.Types.ObjectId(budgetItemId) }] } },
//         { $group: { _id: '$budgetItemId', totalDisbursedAmount: { $sum: '$amount' } } }
//     ]);
//     if (amountOfBudgetItemDisbursed.length === 0) {
//         return 0
//     }
//     return amountOfBudgetItemDisbursed[0].totalDisbursedAmount
// }

async function fetchBudgeItemAmountAproved(budgetItemId, budgetId) {
    const amountOfBudgetItemAproved = await Request.aggregate([
        { $match: { $and: [{ status: 2, budgetId: budgetId }, { budgetItemId: mongoose.Types.ObjectId(budgetItemId) }] } },
        { $group: { _id: '$budgetItemId', totalAprovedAmount: { $sum: '$amount' } } }
    ]);
    if (amountOfBudgetItemAproved.length === 0) {
        return 0
    }
    return amountOfBudgetItemAproved[0].totalAprovedAmount
}

async function fetchInitialBudgetItemAmount(budgetItemId, budgetId) {
    const budget = await Budgets.findOne({ _id: budgetId, 'budgetItems.budgetItemId': budgetItemId }).select('budgetItems')
    const initialBudgetItemAmount = budget.budgetItems.find(item => item.budgetItemId.toString() === budgetItemId.toString()).amount
    return initialBudgetItemAmount
}

/*
* 0 pending
* 1 OnHold
* 2 Approved
* 3 Rejected
* 4 Disbursed
* 5 Confirmed
* 6 Cancelled
*/