import { v4 } from "uuid"
import publishMessage from "../../../aws-sdk/sqs/publishMessage"

export default async function submit(req, res) {
    const { src, language } = req.body
    const jobId = v4()

    const input = {
        jobId,
        src,
        language,
    }

    await publishMessage(input) //handle err

    return res.status(200).json({ jobId: jobId })
}
