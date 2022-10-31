const sqsSchema = require('./sqsSchema')
const dbConnection = require('./db.config')
const getMessages = require('../aws-sdk/sqs/getMessages')

dbConnection()

const saveToDb = async () => {
    
    const res = await getMessages()
    await sqsSchema.create({firstName : JSON.stringify(res)})
}

saveToDb().then(e => console.log('saved'))