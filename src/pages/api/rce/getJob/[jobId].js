import getItem from  '../../../../../aws-sdk/dynamo/getItem'
export default async function retrieveJob(req, res) {
    const { jobId } = req.query
    console.log(jobId)
    let response = await getItem(jobId)

    while (!response.Item) {
        response = await getItem(jobId)
    }

    if (!response.Item) return res.status(401).json("not available")

    return res.status(200).json(response.Item)
}
