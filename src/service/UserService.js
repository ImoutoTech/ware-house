import { verifySSO, getUserInfo, authorizeToken } from '../api'
import { isNil } from 'lodash-es'
import dayjs from 'dayjs'
import jwt from 'jsonwebtoken'

import { success } from '../utils'
import User from '../model/User'
import { ENV } from '../config'

export const UserLogin = async (ticket) => {
  const tokenRes = await authorizeToken(ticket).then((res) => res.data)

  if (tokenRes.code !== 0) {
    return tokenRes
  }

  const { access_token } = tokenRes

  const userInfo = await getUserInfo(`Bearer ${access_token}`).then(
    (res) => res.data
  )

  const { email, id, avatar } = userInfo.data
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

  // 更新用户信息
  dbUser.email = email
  dbUser.avatar = avatar
  await dbUser.save()

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

export const getUserData = async (id) => {
  const user = await User.findOne({ id }).exec()
  if (isNil(user)) {
    throw new Error('not such user')
  }

  return success(user.toObject())
}
