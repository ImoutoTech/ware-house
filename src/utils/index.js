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
