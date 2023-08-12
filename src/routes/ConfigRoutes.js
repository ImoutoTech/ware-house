import express from 'express'
import {
  createConfig,
  getMyConfig,
  deleteConfig,
  modifyConfig,
} from '../service/ConfigService'

const router = express.Router()

router.post('/', async (req, res, _next) => {
  res.json(await createConfig(req.body.data, req.user.id, req.body.slug))
})

router.get('/', async (req, res, _next) => {
  res.json(await getMyConfig(req.user.id))
})

router.delete('/:slug', async (req, res, _next) => {
  res.json(await deleteConfig(req.user.id, req.params.slug))
})

router.put('/:slug', async (req, res, _next) => {
  res.json(await modifyConfig(req.user.id, req.params.slug, req.body))
})

export default router
