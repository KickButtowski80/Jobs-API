const getAllJobs = async(req, res) => {
    res.send('get all jobs 👷‍♀️')
}

const getJob = async(req, res) => {
    res.send('get a job 😄')
}

const createJob = async(req, res) => {
    res.send('create a job 😉')
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