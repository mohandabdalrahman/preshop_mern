const errorhandler = (err, req, res, next) => {
  const errorStatusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(errorStatusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
  next()
}

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

export {
  errorhandler,
  notFound
}