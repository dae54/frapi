const mongoose = require('mongoose')
const { exec } = require("child_process");
// const { ReplSet } = require('mongodb-topology-manager')





// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://daniel:<password>@cluster0-1rhip.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// module.exports = ()=>{
//     console.log('db init')

// }


mongoose.connect(process.env.MONGO_DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

module.exports = () => {

    // console.log('db init')
    var db = mongoose.connection
    db.on('error', (error) => {
        // exec("service mongod start", (error, stdout, stderr) => {
        //     console.log(stdout)
        // })
        // console.log(error)
        console.log('connection error')
    })
    db.once('open', () => {
        console.log('db connected successfully')
    })
}

// const initMongoDB = async () => {
//     console.log('initMongoDB started')
//     mongoose.connect(process.env.MONGO_DB_HOST_LOCAL,
//         { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
//     ).then(res => {
//         console.log('initMongoDB then')
//         console.log('db connected successfully')

//         return res
//         // var db = mongoose.connection
//         // db.once('open', () => {
//         //     console.log('db connected successfully')
//         // })
//     }).catch(error => {
//         console.log('error catch')
//         console.log(error)
//         // return
//         // tryReconnectingDB()
//     })
//     // var db = mongoose.connection
//     // db.once('open', () => {
//     //     console.log('db connected successfully')
//     // })
//     // db.on('error', (error) => {
//     //     tryReconnectingDB()
//     // })

// }

// // initMongoDB()

// const tryReconnectingDB = () => {
//     exec("service mongod start", (error, stdout, stderr) => {
//         console.log(stdout)
//         initMongoDB()
//     })
//     // console.log('connection error')
// }

// const checkConnection = async () => {
//     await initMongoDB()
//     console.log('check connection')

//     var db = mongoose.connection
//     // console.log(db)

//     db.once('open', () => {
//         console.log('db connected successfully')
//         return
//     })
//     db.on('error', (error) => {
//         console.log('error')
//         tryReconnectingDB()
//     })
// }

// module.exports = () => {
//     // initMongoDB()
//     checkConnection()
// }
    // var db = mongoose.connection
    // initMongoDB().then(res => {
    //     db.once('open', () => {
    //         console.log('db connected successfully')
    //     })
    // }).catch(errA => {
    //     console.log(errA)
    //     exec("service mongod start", (errC, stdout, stderr) => {
    //         if (errC) {
    //             return console.log('error', errC)
    //         }
    //         console.log(stdout)

    //         // initMongoDB().then(() => {
    //         //     db.once('open', () => {
    //         //         console.log('db connected successfully')
    //         //     })
    //         // })
    //     })

    //     // db.on('error', (errB) => {
    //     //     exec("service mongod start", (errC, stdout, stderr) => {
    //     //         if (errC) {
    //     //             return console.log('error', errC)
    //     //         }
    //     //         initMongoDB().then(() => {
    //     //             db.once('open', () => {
    //     //                 console.log('db connected successfully')
    //     //             })
    //     //         })
    //     //         console.log(stdout)
    //     //         console.log('errC')
    //     //         console.log(errC)
    //     //     })
    //     //     console.log('errB')
    //     //     console.log(errB)

    //     //     console.log('connection error')

    //     //     console.log('errA')
    //     //     console.log(errA)
    //     // })
    // })
    // mongoose.connect(process.env.MONGO_DB_HOST_LOCAL,
    //     { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    // ).then(res => {
    //     console.log(res)
    //     console.log('done connecting')
    // }).catch(err => {
    //     console.log(err)
    //     console.log('error')
    // })
// }

// module.exports = async () => {
//     console.log('mongoose version ', mongoose.version)
//     await setupReplicaSet()
//     await mongoose.connect(process.env.REPLICA_DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
//     await mongoose.connection.createCollection('tempp')

//     const tempSchema = new mongoose.Schema({
//         name: String
//     })
//     const Temp = mongoose.model('Temp', tempSchema)

//     Temp.watch()
//         .on('change', data => {
//             console.log('changedd')
//         })

// }

// async function setupReplicaSet() {
//     const bind_ip = 'localhost'

//     const replSet = new ReplSet('mongod', [
//         { options: { port: 31000, dbpath: `${__dirname}/data/db/31000`, bind_ip }, },
//         { options: { port: 31001, dbpath: `${__dirname}/data/db/31001`, bind_ip }, },
//         { options: { port: 31002, dbpath: `${__dirname}/data/db/31002`, bind_ip }, },
//     ], { replSet: 'rs0' })
//     await replSet.purge();
//     await replSet.start();
//     console.log('replica set started ...')
// }