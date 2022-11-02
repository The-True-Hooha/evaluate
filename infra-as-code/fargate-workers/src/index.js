const sqsSchema = require('./sqsSchema')
const dbConnection = require('./db.config')
const getMessages = require('../aws-sdk/sqs/getMessages')
const dotenv = require('dotenv')
dotenv.config()

dbConnection()

const saveToDb = async () => {
    
    const res = await getMessages()
    await sqsSchema.create({firstName : JSON.stringify(res)})
}

saveToDb().then(e => console.log('saved'))