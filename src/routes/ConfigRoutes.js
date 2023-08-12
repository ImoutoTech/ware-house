import express from 'express'

const router = express.Router()

router.post('/', async (req, res, _next) => {
  console.log(req.user)
  res.json({})
})

export default router
