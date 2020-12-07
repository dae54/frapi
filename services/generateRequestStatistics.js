const mongoose = require('mongoose')
const Request = require('../modules/Requests/requests.model')
const BudgetItems = require('../modules/BudgetItems/budgetItems.model')
// const Budgets = require('../modules/Budgets/budget.model')

module.exports = {
    requestStatistics: async () => {
        const pendingRequests = await fetchPendingRequests();
        // console.log(pendingRequests)

        const requestsOnHold = await fetchRequestsOnHold();
        // console.log(requestsOnHold)

        const mostRequestedBudgetItem = await fetchMostRequestedBudgetItem();
        // console.log(mostRequestedBudgetItem)
        const requestStats = { pendingRequests, requestsOnHold, mostRequestedBudgetItem }
        return requestStats
    },
}
async function fetchPendingRequests() {
    var sum = 0
    const pendingRequests = await Request.find({ status: 0 }).select('amount')
    // console.log(pendingRequests)
    pendingRequests.forEach(item => {
        sum = sum + item.amount
    })
    const final = { pendingRequestsCount: pendingRequests.length.toLocaleString(), pendingAmount: sum.toLocaleString() }
    // const pendingRequests = await Request.aggregate([
    //     { $match: { status: 4 } },
    //     { $group: { _id: '$status', totalDisbursedAmount: { $sum: '$amount' } } },
    // ]);
    return final
}

async function fetchRequestsOnHold() {
    var sum = 0
    const requestsOnHold = await Request.find({ status: 1 }).select('amount')
    requestsOnHold.forEach(item => {
        sum = sum + item.amount
    })
    const final = { requestsOnHold: requestsOnHold.length.toLocaleString(), onHoldAmount: sum.toLocaleString() }
    return final
}

async function fetchMostRequestedBudgetItem() {
    // var sum = 0
    // const mostRequestedBudgetItem = await Request.find()
    const mostRequestedBudgetItem = await Request.aggregate([
        { $group: { _id: "$budgetItemId", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
    ]
    );
    if (mostRequestedBudgetItem.length === 0) return { count: '', mostRequestedBudgetItem: 'No data' }
    const budgetItem = await BudgetItems.findById(mostRequestedBudgetItem[0]._id).select('name')
    // const final = { mostRequestedBudgetItem: budgetItem.name, count: mostRequestedBudgetItem[0].count }
    return { mostRequestedBudgetItem: budgetItem.name, count: mostRequestedBudgetItem[0].count.toLocaleString() }
}