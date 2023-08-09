import express from 'express'
import { UserLogin } from '../service/UserService'

const router = express.Router()

router.get('/login', async (req, res, _next) => {
  const { ticket } = req.query

  const result = await UserLogin(ticket)
  res.json(result)
})

export default router
