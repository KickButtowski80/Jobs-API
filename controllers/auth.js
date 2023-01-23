const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')

const register = async (req, res, next) => {
    // mongoo vaildator will be used 
    const user = await User.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
    res.json(req.body)
}

module.exports = {
    register,
    login,
}