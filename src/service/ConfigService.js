import Config from '../model/Config'
import { v4 as uuidv4 } from 'uuid'
import { isNil } from 'lodash-es'
import { domainGate } from './ConfigDomainService'

import { getDate, success } from '../utils'

/**
 * 创建配置
 *
 * @param {string} data 配置内容
 * @param {number} owner 拥有者
 * @param {string} slug slug
 * @param {string} name 名字
 * @returns ConfigJson
 */
export const createConfig = async (data, owner, slug, name) => {
  const slugExists = await Config.exists({ slug })

  if (slug && slugExists) {
    throw new Error('slug existed')
  }

  const config = new Config({
    data,
    owner,
    name,
    slug: slug || uuidv4(),
    created_at: getDate(),
    updated_at: getDate(),
  })

  await config.save()

  return success(config.toJSON())
}

/**
 * 获取指定Config列表
 *
 * @param {Object} filter 过滤条件
 * @returns Config[]
 */
export const getConfigList = async (filter) => {
  return await Config.find(filter).exec()
}

/**
 * 获取指定Config列表（分页）
 * @param {Object} filter 过滤条件
 * @param {Object} options 分页设置
 */
export const getConfigListPaginated = async (filter, options = {}) => {
  const data = await Config.paginate(filter, options)
  return {
    items: data.docs,
    total: data.totalDocs,
  }
}

/**
 * 获取用户Config列表
 *
 * @param {number} owner 所有者ID
 * @param {Object} options 分页条件
 * @returns Config[]
 */
export const getMyConfig = async (owner, options) => {
  const query = { owner }

  if (options.search) {
    const searchReg = new RegExp(options.search, 'i')
    query.name = searchReg
  }

  return success(await getConfigListPaginated(query, options))
}

/**
 * 删除配置
 *
 * @param {number} owner 所有者ID
 * @param {string} slug slug
 * @returns null
 */
export const deleteConfig = async (owner, slug) => {
  const config = await Config.findOne({ owner, slug }).exec()
  if (isNil(config)) {
    throw new Error('no such config')
  }

  await config.deleteOne()

  return success(null)
}

/**
 * 编辑配置
 *
 * @param {string} owner 所有者ID
 * @param {string} slug slug
 * @param {Object} body 请求体
 * @returns null
 */
export const modifyConfig = async (owner, slug, body) => {
  const config = await Config.findOne({ owner, slug }).exec()
  if (isNil(config)) {
    throw new Error('no such config')
  }

  ;['data', 'name'].forEach((key) => {
    if (!isNil(body[key])) {
      config[key] = body[key]
    }
  })

  if (!isNil(body.slug)) {
    if (!body.slug) {
      throw new Error('invalid slug')
    }

    if ((await Config.find({ slug: body.slug }).exec()).length > 1) {
      throw new Error('slug existed')
    }

    config.slug = body.slug
  }

  config.updated_at = getDate()

  await config.save()

  return success(null)
}

/**
 * 获取Config详情
 *
 * @param {string} slug slug
 * @returns ConfigJson
 */
export const getConfigDetail = async (slug) => {
  const config = await Config.findOne({ slug }).exec()
  if (isNil(config)) {
    throw new Error('no such config')
  }

  return success(config.toJSON())
}

/**
 * 用户获取config
 * 直接返回
 *
 * @param {string} slug slug
 * @returns ConfigJson
 */
export const getConfig = async (slug, origin) => {
  const config = await Config.findOne({ slug }).exec()
  if (isNil(config)) {
    throw new Error('no such config')
  }

  if (!(await domainGate(config._id, origin))) {
    throw new Error('not allowed to visit this config')
  }

  return JSON.parse(config.data)
}
