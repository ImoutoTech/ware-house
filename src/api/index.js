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

export const getUserInfo = (id, token) => {
  return axios.get(`/user/${id}`, {
    headers: {
      Authorization: token,
    },
    baseURL: ENV.SSO_URL,
  })
}
