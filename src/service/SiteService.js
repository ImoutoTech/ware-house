import Site from '../model/Site'
import { isNil } from 'lodash-es'
import { getConfigList } from './ConfigService'

import { getDate, success, formatStrArr } from '../utils'

export const createSite = async (owner, body) => {
  const { domains, name, configs } = body

  const site = new Site({
    domains: formatStrArr(domains),
    owner,
    configs: formatStrArr(configs),
    name,
    created_at: getDate(),
    updated_at: getDate(),
  })

  await site.save()

  return success(site.toJSON())
}

export const getSiteList = async (filter) => {
  return await Site.find(filter).exec()
}

export const getConfigs = async (site) => {
  return await getConfigList({
    _id: {
      $in: site.configs,
    },
  })
}

export const getSiteConfigs = async (id) => {
  const site = await Site.findById(id).exec()

  if (isNil(site)) {
    throw new Error('now such site')
  }

  return await getConfigs(site)
}

export const getMySite = async (owner) => {
  return success((await getSiteList({ owner })).map((item) => item.toJSON()))
}

export const deleteSite = async (owner, id) => {
  const site = await Site.findOne({ owner, _id: id }).exec()
  if (isNil(site)) {
    throw new Error('no such site')
  }

  await site.deleteOne()

  return success(null)
}

export const modifySite = async (owner, id, body) => {
  const site = await Site.findOne({ owner, _id: id }).exec()
  if (isNil(site)) {
    throw new Error('no such site')
  }

  if (!isNil(body.name)) {
    site.name = body.name
  }

  ;['domains', 'configs'].forEach((key) => {
    if (!isNil(body[key])) {
      site[key] = formatStrArr(body[key])
    }
  })

  site.updated_at = getDate()

  await site.save()

  return success(null)
}
