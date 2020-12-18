const express = require('express')
const app = express();
var cors = require('cors')
var bodyParser = require('body-parser')
const http = require('http')
const NotificationHandler = require('./modules/Notifications/notification.controller')
// const webpush = require('web-push')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
    origin: ["http://localhost:3000",],
    credentials: true,
    exposedHeaders:true,
}))
const server = http.createServer(app)

require('dotenv').config()

const db = require('./config/db')
db()
const routes = require('./routes')
routes(app)
// set public folder static
app.use(express.static('public'));
app.use('/attachments', express.static(__dirname + '/public/attachments'));
// initialize
const seeder = require('./modules/AccessControl/access.seeder')
seeder.init()
// seeder.createPermission();
// seeder.seedRoles();
// seeder.seedSettings();
// clg
// initialize socket io
NotificationHandler.init(server)

const port = process.env.PORT || 8080
server.listen(port, () => {
    console.log(`server started at port${port}`)
})