import dayjs from 'dayjs'
import { ENV } from '../config'

export const result = (code, msg, data) => {
  return {
    code,
    msg,
    data,
  }
}

export const success = (data) => {
  return result(0, 'ok', data)
}

export const jwtFormatter = (req, _res, next) => {
  if (req.user) {
    req.user.id = Number(req.user.id)
  }

  next()
}

export const getDate = (date = new Date()) =>
  dayjs(date).format('YYYY-MM-DD HH:mm:ss')

export const formatStrArr = (str) =>
  String(str)
    .split(',')
    .filter((item) => !!item)

export const corsHandler = (origin, cb) => {
  if (ENV.FRONT_URL.indexOf(origin) !== -1 || !origin) {
    cb(null, true)
  } else {
    cb(new Error('Not allowed by CORS'))
  }
}
