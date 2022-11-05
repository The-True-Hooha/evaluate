import dbClient from "../../../../aws-sdk/config/db.config"
import testSchema from "../../../../aws-sdk/config/testSchema"
import mongoose from 'mongoose'
export default async function retrieveJob(req, res) {
    const { jobId } = req.query

    return res.status(200)
    
}