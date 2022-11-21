import { GetItemCommand } from "@aws-sdk/client-dynamodb"
import { client } from "../config/dynamo.config"
export default async (jobId) => {
    const input = {
        TableName: "evaluateCacheStore",
        Key: { jobId: { S: jobId } },
    }

    const command = new GetItemCommand(input)
    const res = client.send(command)
    return res
}
