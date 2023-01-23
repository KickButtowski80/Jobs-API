const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const bcrypt = require('bcryptjs')

const register = async (req, res, next) => {

    const { name, email, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hasedPassword = await bcrypt.hash(password, salt)

    const tempUser = {
        name,
        email,
        password: hasedPassword
    }


    // mongoo vaildator will be used 
    const user = await User.create({ ...tempUser })
    res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
    res.json(req.body)
}

module.exports = {
    register,
    login,
}