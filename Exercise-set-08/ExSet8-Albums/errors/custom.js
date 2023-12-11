const { StatusCodes } = require('http-status-codes')
const APIError = require('./apierror')

class CustomError extends APIError{
    constructor(message, code){
        super(message)
        this.statusCode = code;
    }
}

module.exports = { CustomError }