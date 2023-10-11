import express from 'express'
import {
  createConfig,
  getMyConfig,
  deleteConfig,
  modifyConfig,
  getConfigDetail,
  getConfig,
} from '../service/ConfigService'
import cors from 'cors'

const router = express.Router()

router.post('/', async (req, res, _next) => {
  res.json(
    await createConfig(req.body.data, req.user.id, req.body.slug, req.body.name)
  )
})

router.get('/', async (req, res, _next) => {
  const options = ['limit', 'offset', 'search'].reduce(
    (p, c) => (req.query[c] ? { ...p, [c]: req.query[c] } : p),
    {}
  )
  res.json(await getMyConfig(req.user.id, options))
})

router.delete('/:slug', async (req, res, _next) => {
  res.json(await deleteConfig(req.user.id, req.params.slug))
})

router.put('/:slug', async (req, res, _next) => {
  res.json(await modifyConfig(req.user.id, req.params.slug, req.body))
})

router.get('/get', async (req, res, _next) => {
  res.json(await getConfig(req.query.slug, req.headers.origin))
})

router.get('/:id', async (req, res, _next) => {
  res.json(await getConfigDetail(req.params.id))
})

export default router
