import { SendMessageCommand } from '@aws-sdk/client-sqs'
import { v4 } from 'uuid'
import { client } from "../config/sqs.config"
import queueUrl from './getQueueUrl'

export default async function publishMessage(submission) {
    const url = await queueUrl()
    const input = {
        QueueUrl: url,
        MessageGroupId: v4(),
        MessageDeduplicationId: v4(),
        MessageBody: JSON.stringify(submission),
    }

    const command = new SendMessageCommand(input);
    const response = await client.send(command);

    return response
}
