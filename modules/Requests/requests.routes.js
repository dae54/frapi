const Router = require('express')
const router = new Router()
const requestController = require('./requests.controller')
const multer = require('multer')
const uuidv4 = require('uuid').v4

// initialize multer 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/attachments');
    },
    filename: (req, file, cb) => {
        // const fileName = file.originalname.toLowerCase().split(' ').join('-');
        const fileExt = file.originalname.split('.').pop();
        cb(null, uuidv4() + '.' + fileExt)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
/** @function viewRequests 
 * THIS FUNCTION IS FOR CREATING NEW REQUEST
 * ACCEPTS THE FOLLOWING PARAMETERS IN @param req.body
 * @param { budgetItemId, budgetId, description, amount, userId }
 * @returns { @type Object (createdRequest), status = [true|false]}
 */
router.post('/', requestController.createNewRequest)

/** @function viewRequests 
 * THIS FUNCTION CAN :-
 * 1. FETCH SINGLE REQUEST (BY ID) <all or some properties>,
 * 2. FETCH MULTIPLE REQUESTS, SELECT depending on the params
 * POSSIBLE PARAMETERS
 * IN @param req.query,
 * @param select, expected: [ARRAY OF ATTRIBUTES TO BE SELECTED]
 * @param identifier, expected: [SINGLE NAMED PARAMETER THAT IS USED FOR SEARCHING]
 * @param value, expected: [SINGLE NAMED VALUE CARRYING THE VALUE OF @param identifier ]
 * @returns 
 */

// REMARK ROUTES
router.get('/remarks', requestController.fetchRemarks)
router.put('/remarks', requestController.addRemarks)
router.delete('/:requestId/remark/:remarkId', requestController.deleteRemark)


router.get('/budget/:id', requestController.viewRequestByBudgetId)

router.delete('/:id', requestController.deleteRequest)

router.get('/stats', requestController.requestStatistics)
router.get('/dashboardStats', requestController.requestDashboardStatistics)


router.get('/requestStatusAmount', requestController.requestStatusAmount)
router.get('/history', requestController.requestHistory)

router.post('/attach', upload.single('attachment'), requestController.addAttachment)
router.get('/attach/:requestID', requestController.getAttachments)
// router.get('/requestBudgetInfo/:requestId', requestController.viewRequestVSBudgetInfo)
// router.post('/aprove', requestController.aproveRequest)//patch
// router.post('/changeStatus',requestController.changeRequestStatus)
// router.post('/confirm',requestController.confirmRequest)
router.get('/aprove/:requestID?', requestController.getRequestAproves)
router.patch('/aprove/:requestID', requestController.aproveRequest)
router.patch('/revertAprove/:requestID', requestController.revertAprove)
router.patch('/:requestId/changeStatus/:status', requestController.changeRequestStatus)


router.get('/', requestController.viewRequests)

router.get('/:id', requestController.viewRequestById)
router.get('/user/:id', requestController.viewRequestByUserId)

module.exports = router