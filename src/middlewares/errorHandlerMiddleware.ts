import { ErrorRequestHandler } from 'express'

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.statusCode, err.message, err.data)
  return res.status(err.statusCode).json(err.data)
}

export default errorHandlerMiddleware
