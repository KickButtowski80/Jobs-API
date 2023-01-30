
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE,
    msg: err.message || '😨Something went wrong. 👍 please try again'
  }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((e) => e.message)
      .join(',')
    customError.statusCode = 400
  }
  if (err.code && err.code === 11000) {
    customError.msg = `😨Duplicate value entered for ${Object.keys(err.keyValue)} field,👍 please choose another value`
  } customError.statusCode = 404
  
  if (err.name === 'CastError') {
    customError.msg = `🛑No Item Found with id: ${err.value}`
    customError.statusCode = 400
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
