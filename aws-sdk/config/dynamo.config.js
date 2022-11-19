import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
const config = {
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_KEY,
    },
}
const client = new DynamoDBClient(config)
module.exports = { client }
