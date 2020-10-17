const Settings = require('./settings.model')

module.exports = {
    viewSettings: async (req, res) => {
        try {
            const settings = await Settings.find().select('name value -_id')
            return res.status(200).json({
                message: 'settings list',
                data: settings
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: error.message
            })
        }
    },
    updateIdleTime: async (req, res) => {
        try {
            const { value } = req.params
            const newIdleTime = await Settings.findOneAndUpdate({ 'name': 'idleTime' }, { $set: { value } }, { new: true, useFindAndModify: false }).select('value -_id')
            return res.status(200).json({
                message: 'idle time updated',
                data: { idleTime: newIdleTime.value }
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: error.message
            })
        }
    },
    updateFundfundAproversCount: async (req, res) => {
        try {
            const { value } = req.params
            const newFundAproversCount = await Settings.findOneAndUpdate({ 'name': 'fundAprovers' }, { $set: { value } }, { new: true, useFindAndModify: false }).select('value -_id')
            return res.status(200).json({
                message: 'fund aprovers count updated',
                data: { fundAprovers: newFundAproversCount.value }
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: error.message
            })
        }
    },
    notificationAutoDelete: async (req, res) => {
        try {
            const { value } = req.params
            const newNotificationAutoDelete = await Settings.findOneAndUpdate({ 'name': 'notificationAutoDelete' }, { $set: { value } }, { new: true, useFindAndModify: false }).select('value -_id')
            return res.status(200).json({
                message: 'fund aprovers count updated',
                data: { notificationAutoDelete: newNotificationAutoDelete.value }
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: error.message
            })
        }
    }, getSettingsValueByName: async (req, res) => {
        try {
            const { name } = req.params
            console.log(name)

            const settings = await Settings.findOne({name}).select('name value -_id')
            console.log(settings)
            return res.status(200).json({
                message: 'done',
                data: settings
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                userMessage: 'Whoops! Something went wrong.',
                developerMessage: error.message
            })
        }
    }
}