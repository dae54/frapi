
// module.exports = async function countRequestAproves(res, requestId, RequestAproves, Request) {
//     try {
//         let result = await RequestAproves.find({ requestId: requestId })
//         if (result.length === 3) {
//             const doc = await Request.findOne({ _id: requestId })
//             doc.status = 1
//             const aprovedRequest = await doc.save()
//             res.status(201).json({
//                 status: true,
//                 message: 'set to Aproved status',
//                 data: aprovedRequest
//             })
//         } else if (result.length > 3) {
//             const aprovedRequest = await Request.findOne({ _id: requestId })
//             res.status(201).json({
//                 status: false,
//                 message: 'maximum number of request aproves reached',
//                 data: aprovedRequest
//             })
//         }
//         else {
//             return res.status(201).json({
//                 status: true,
//                 message: 'aprove successfully added',
//                 data: {}
//             })
//         }
//     } catch (e) {
//         console.log(e)
//         return res.status(500).json({
//             userMessage: 'Whoops something went wrong',
//             developerMessage: e.message
//         })
//     }
// }