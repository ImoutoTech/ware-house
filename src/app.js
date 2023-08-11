import express from 'express'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import logger from 'morgan'
import { expressjwt } from 'express-jwt'
import { jwtFormatter, result } from './utils/index.js'

import { ENV } from './config/index.js'

import userRoutes from './routes/UserRoutes.js'

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  expressjwt({
    secret: ENV.TOKEN_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: false,
    requestProperty: 'user',
    onExpired: (_req, res) =>
      res.status(401).json(result(401, 'token expired', null)),
  })
)
app.use(jwtFormatter)

app.use('/user', userRoutes)

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
