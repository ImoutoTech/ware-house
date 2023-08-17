import express from 'express'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import logger from 'morgan'
import { expressjwt } from 'express-jwt'
import 'express-async-errors'
import { jwtFormatter, result, corsMiddleWare } from './utils/index.js'

import { ENV } from './config/index.js'

import UserRoutes from './routes/UserRoutes.js'
import ConfigRoutes from './routes/ConfigRoutes.js'
import SiteRoutes from './routes/SiteRoutes.js'

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(corsMiddleWare)
app.use(
  expressjwt({
    secret: ENV.TOKEN_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: true,
    requestProperty: 'user',
    onExpired: (_req, error) => {
      throw error
    },
  }).unless({ path: ['/user/login', '/config/get'] })
)
app.use(jwtFormatter)

app.use('/user', UserRoutes)
app.use('/config', ConfigRoutes)
app.use('/site', SiteRoutes)

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
