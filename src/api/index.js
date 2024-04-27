import axios from 'axios'
import { ENV } from '../config/index'

export const verifySSO = (token) => {
  return axios.get('/user/validate', {
    headers: {
      Authorization: token,
    },
    baseURL: ENV.SSO_URL,
  })
}

export const getUserInfo = (token) => {
  return axios.get(`/oauth/user`, {
    headers: {
      Authorization: token,
    },
    baseURL: ENV.SSO_URL,
  })
}

export const authorizeToken = (code) =>
  axios.post(
    '/oauth/token',
    {},
    {
      baseURL: ENV.SSO_URL,
      params: {
        client_id: ENV.SSO_ID,
        client_secret: ENV.SSO_SECRET,
        code,
        redirect_uri: ENV.SSO_REDIRECT,
      },
    }
  )
