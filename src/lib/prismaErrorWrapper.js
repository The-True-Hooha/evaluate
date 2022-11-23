// wraps all prisma operations in try and catch
export default async function prismaErrorWrapper(res, prismaOperation) {
    try {
        const result = await prismaOperation()
        return res.status(200).json(result)
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: err.message,
        })
    }
}
