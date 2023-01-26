const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')


const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId })
        .sort('createdAt')
    res.status(StatusCodes.OK).json({ count: jobs.length, jobs })

}

const getJob = async (req, res) => {
    //jobId is alias for id which refers to a job
    const { user: { userId }, params: { id: jobId } } = req
    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    })
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId} `)
    }
    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
    res.send('job is updated 😆')
}

const deleteJob = (req, res) => {
    res.send('delete a job 💁')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}