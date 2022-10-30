const { ReceiveMessageCommand, GetQueueUrlCommand } = require('@aws-sdk/client-sqs')
const client = require("../config/global")
module.exports = async function getMessages() {
    const command = new GetQueueUrlCommand({ QueueName: "codeSubmission.fifo" });
    const response = await client.send(command);
    const input = {
        MaxNumberOfMessages: 1,
        QueueUrl: response.QueueUrl
    }
    const com = new ReceiveMessageCommand(input);
    const res = await client.send(com);
    return res?.Messages[0]?.Body
}
