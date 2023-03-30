const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = process.env.MONGO_URI
const dbName = process.env.MONGO_DB_NAME

let db = null

function connect() {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
        db = client.db(dbName)

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
    // TODO: 
}

connect()

module.exports = {
    connect,
    getDb
}