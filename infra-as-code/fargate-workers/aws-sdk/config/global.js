const { SQSClient } = require("@aws-sdk/client-sqs");
const dotenv = require('dotenv')
dotenv.config()

const config = {
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_KEY
    }
}
const client = new SQSClient(config);
module.exports = client