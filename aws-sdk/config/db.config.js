import { connect } from 'mongoose'

export default function dbClient() {
    const databaseParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    try {
       console.log("connected to the mongodb database")
       connect(process.env.db, databaseParams)
    } catch (error) {
        console.log(`${error} could not connect`)
    }
}