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
