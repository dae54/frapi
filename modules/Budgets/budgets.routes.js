const Router = require('express')
const router = new Router()
const budgetsController = require('./budgets.controller')

router.post('/',budgetsController.createBudget)
router.post('/addBudgetItemsToBudget',budgetsController.addBudgetItemsToBudget)
router.get('/checkActive',budgetsController.checkActive)
router.get('/budgetDistribution',budgetsController.budgetDistribution)
router.get('/list',budgetsController.budgetNamesList)
router.get('/',budgetsController.viewBudget)
// router.get('/report',budgetsController.generateReport)
// router.get('/id/:budgetId',budgetsController.viewBudgetById)
// router.get('/',budgetsController.viewBudgetById)
router.get('/hist',budgetsController.viewBudgetRequestsHist)

router.get('/report/:budgetId',budgetsController.generateReport)

router.get('/:status',budgetsController.viewBudgetByStatus)
router.patch('/edit/:target',budgetsController.editBudget)
router.patch('/addItem',budgetsController.addItem)
router.patch('/:budgetId/:status',budgetsController.changeStatus)
router.delete('/',budgetsController.deleteBudget)
router.get('/validate/:name', budgetsController.validateBudgetName)

module.exports = router
// view by status