const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = process.env.MONGO_URI
const dbName = process.env.MONGO_DB_NAME

let db = null

function connect() {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
        db = client.db(dbName)
        createIndexes(db)

        console.log(`Great success - mongo connected to ${dbName}`)
    } catch (err) {
        console.error('MongoDB connection error', err)
        throw err
    }
}

function getDb() {
    return db
}

function createIndexes(db) {
    db.collection('wallets').createIndex({ 'socialHandleType': 1, 'socialHandle': 1 }, { unique: true })
}

connect()

module.exports = {
    connect,
    getDb
}