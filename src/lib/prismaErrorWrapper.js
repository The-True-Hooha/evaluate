// wraps all prisma operations in try and catch
export default async function prismaErrorWrapper(res, prismaOperation) {
    try {
        const result = await prismaOperation()

        if (!result)
            return res.status(404).json("No response returned for query")
        return res.status(200).json(result)
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: err.message,
        })
    }
}
