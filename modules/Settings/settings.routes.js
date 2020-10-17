const Router = require('express')
const router = new Router()
const settingsController = require('./settings.controller')

router.patch('/idletime/:value', settingsController.updateIdleTime)
router.patch('/fundaprovers/:value', settingsController.updateFundfundAproversCount)
router.patch('/notificationAutoDelete/:value', settingsController.notificationAutoDelete)
router.get('/', settingsController.viewSettings)
router.get('/:name', settingsController.getSettingsValueByName)


// router.get('/budgetItemNameAmount/:budgetId',settingsController.budgetItemNameAmount)
// router.get('/:budgetItemId',settingsController.viewBudgetItems)
// router.get('/',settingsController.viewBudgetItems)
// router.post('/delete',settingsController.deleteBudgetItem)
// router.get('/info/:budgetItemId',settingsController.budgetItemAmountDetails)

module.exports = router