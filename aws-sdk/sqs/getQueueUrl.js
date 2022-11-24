import { GetQueueUrlCommand } from "@aws-sdk/client-sqs"
import { client } from "../config/sqs.config"

export default async function getQueueUrl() {
    const command = new GetQueueUrlCommand({ QueueName: "pythonCodeSubmission.fifo" })
    const response = await client.send(command)

    return response.QueueUrl
}
