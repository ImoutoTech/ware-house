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
