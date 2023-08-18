import express from 'express'
import { UserLogin, getUserData } from '../service/UserService'

const router = express.Router()

router.get('/login', async (req, res, _next) => {
  const { ticket } = req.query

  const result = await UserLogin(ticket)
  res.json(result)
})

router.get('/data', async (req, res, _next) => {
  const { user } = req
  res.json(await getUserData(user.id))
})

export default router
