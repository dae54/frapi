const Router = require('express')
const router = new Router()
const budgetItemsController = require('./budgetItems.controller')

router.post('/',budgetItemsController.createBudgetItems)
router.patch('/:budgetItemId',budgetItemsController.editBudgetItems)
router.get('/budgetItemNameAmount/:budgetId',budgetItemsController.budgetItemNameAmount)
router.get('/:budgetItemId',budgetItemsController.viewBudgetItems)
router.get('/',budgetItemsController.viewBudgetItems)
router.delete('/:budgetItemId',budgetItemsController.deleteBudgetItem)
// router.post('/balance',budgetItemsController.budgetItemBalance)
router.get('/info/:budgetItemId',budgetItemsController.budgetItemAmountDetails)

module.exports = router