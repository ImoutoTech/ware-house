import express from 'express'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import logger from 'morgan'

import usersRouter from './routes/users.js'

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/users', usersRouter)

app.use(function (_req, res, _next) {
  res
    .status(404)
    .json({ message: "We couldn't find what you were looking for 😞" })
})

app.use(function (err, _req, res, _next) {
  console.error(err.stack)
  res.status(500).json(err)
})

export default app
