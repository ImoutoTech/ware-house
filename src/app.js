import express from 'express'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import logger from 'morgan'
import { expressjwt } from 'express-jwt'
import 'express-async-errors'
import { jwtFormatter, result } from './utils/index.js'

import { ENV } from './config/index.js'

import UserRoutes from './routes/UserRoutes.js'
import ConfigRoutes from './routes/ConfigRoutes.js'

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
    credentialsRequired: true,
    requestProperty: 'user',
    onExpired: (_req, res) =>
      res.status(401).json(result(401, 'token expired', null)),
  }).unless({ path: ['/user/login'] })
)
app.use(jwtFormatter)

app.use('/user', UserRoutes)
app.use('/config', ConfigRoutes)

// 404处理
app.use(function (_req, res, _next) {
  res
    .status(404)
    .json({ message: "We couldn't find what you were looking for 😞" })
})

// 错误处理
app.use(function (err, _req, res, _next) {
  res.status(500).json(result(100, err.message || err.inner.message, null))
})

export default app
