import Site from '../model/Site'
import { isNil } from 'lodash-es'
import { getConfigList } from './ConfigService'
import { updateConfigDomin } from './ConfigDomainService'

import { getDate, success, formatStrArr } from '../utils'

/**
 * 根据站点ID拉取站点
 * 没有找到时会抛出异常
 *
 * @param {string} id 站点ID
 * @returns Site
 */
const getSiteById = async (id) => {
  const site = await Site.findById(id).exec()

  if (isNil(site)) {
    throw new Error('now such site')
  }

  return site
}

/**
 * 创建站点
 *
 * @param {number} owner 用户id
 * @param {Object} body 请求体
 * @returns 站点信息
 */
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

  // 异步更新一下config domin映射
  site.configs.forEach(updateConfigDomin)

  return success(site.toJSON())
}

/**
 * 获取满足条件的站点列表
 *
 * @param {Object} filter 过滤条件
 * @returns Site[]
 */
export const getSiteList = async (filter) => {
  return await Site.find(filter).exec()
}

/**
 * 获取满足条件的站点列表（分页）
 * @param {Object} filter 过滤条件
 * @param {Object} options 分页设置
 */
export const getSiteListPaginated = async (filter, options = {}) => {
  const data = await Site.paginate(filter, options)
  return {
    items: data.docs,
    total: data.totalDocs,
  }
}

/**
 * 获取站点所拥有的配置详情列表
 *
 * @param {Site} site 站点
 * @returns Config[]
 */
export const getConfigs = async (site) => {
  return await getConfigList({
    _id: {
      $in: site.configs,
    },
  })
}

/**
 * 根据站点ID获取站点所拥有的配置详情列表
 *
 * @param {string} id 站点id
 * @returns Config[]
 */
export const getSiteConfigs = async (id) => {
  const site = await getSiteById(id)

  return await getConfigs(site)
}

/**
 * 获取用户拥有的站点列表
 *
 * @param {number} owner 用户ID
 * @returns Site[]
 */
export const getMySite = async (owner, options) => {
  return success(await getSiteListPaginated({ owner }, options))
}

/**
 * 删除站点
 *
 * @param {number} owner 拥有者id
 * @param {string} id 站点ID
 * @returns null
 */
export const deleteSite = async (owner, id) => {
  const site = await getSiteById(id)

  if (site.owner !== owner) {
    throw new Error('not your site')
  }

  const configs = site.configs

  await site.deleteOne()

  // 异步更新
  configs.forEach(updateConfigDomin)

  return success(null)
}

/**
 * 编辑站点
 *
 * @param {number} owner 用户id
 * @param {string} id 站点ID
 * @param {Object} body 消息体
 * @returns null
 */
export const modifySite = async (owner, id, body) => {
  const site = await getSiteById(id)
  let needUpdateConfig = false

  if (site.owner !== owner) {
    throw new Error('not your site')
  }

  if (!isNil(body.name)) {
    site.name = body.name
  }

  ;['domains', 'configs'].forEach((key) => {
    if (!isNil(body[key])) {
      site[key] = formatStrArr(body[key])
      needUpdateConfig = true
    }
  })

  site.updated_at = getDate()

  await site.save()

  if (needUpdateConfig) {
    // 异步更新
    site.configs.forEach(updateConfigDomin)
  }

  return success(null)
}

/**
 * 获取站点信息
 *
 * @param {string} id 站点id
 * @returns SiteJson
 */
export const getSiteDetail = async (id) => {
  const site = await getSiteById(id)

  const data = {
    ...site.toJSON(),
    configs: await getSiteConfigs(site),
  }

  return success(data)
}
