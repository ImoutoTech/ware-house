import { verifySSO } from '../api'
import { isNil } from 'lodash-es'
import dayjs from 'dayjs'
import jwt from 'jsonwebtoken'

import { success } from '../utils'
import User from '../model/User'
import { ENV } from '../config'

export const UserLogin = async (ticket) => {
  const verifyRes = await verifySSO(`Bearer ${ticket}`)
    .then((res) => res.data)
    .catch((e) => {
      return e.response.data
    })

  if (verifyRes.code !== 0) {
    return verifyRes
  }

  const { email, id, avatar } = verifyRes.data
  const dbUser = await User.findOne({ id }).exec()
  if (isNil(dbUser)) {
    const user = new User({
      id,
      email,
      avatar,
      created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    })
    await user.save()

    return success({
      user: user.toObject(),
      token: jwt.sign(
        {
          email,
          id,
        },
        ENV.TOKEN_SECRET,
        {
          expiresIn: '3d',
        }
      ),
    })
  }

  return success({
    user: dbUser.toObject(),
    token: jwt.sign(
      {
        email: dbUser.email,
        id: dbUser.id,
      },
      ENV.TOKEN_SECRET,
      {
        expiresIn: '3d',
      }
    ),
  })
}
