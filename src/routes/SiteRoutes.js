import express from 'express'
import {
  createSite,
  getMySite,
  deleteSite,
  modifySite,
  getSiteDetail,
  getSiteConfigs,
} from '../service/SiteService'

const router = express.Router()

router.post('/', async (req, res, _next) => {
  res.json(await createSite(req.user.id, req.body))
})

router.get('/', async (req, res, _next) => {
  res.json(await getMySite(req.user.id))
})

router.delete('/:id', async (req, res, _next) => {
  res.json(await deleteSite(req.user.id, req.params.id))
})

router.put('/:id', async (req, res, _next) => {
  res.json(await modifySite(req.user.id, req.params.id, req.body))
})

router.get('/:id', async (req, res, _next) => {
  res.json(await getSiteDetail(req.params.id))
})

router.get('/:id/configs', async (req, res, _next) => {
  res.json(await getSiteConfigs(req.params.id))
})

export default router
