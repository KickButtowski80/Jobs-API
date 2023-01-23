const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
 

const register = async (req, res) => {
    // mongoo vaildator will be used 
    const user = await User.create({ ...req.body })
    const token =  user.createJWT();
    res.status(StatusCodes.CREATED)
    .json({ user: { name: user.getName() }, token })
}

const login = async (req, res) => {
    res.json(req.body)
}

module.exports = {
    register,
    login,
}