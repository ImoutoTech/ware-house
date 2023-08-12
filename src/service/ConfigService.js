import Config from '../model/Config'
import { v4 as uuidv4 } from 'uuid'
import { isNil } from 'lodash-es'

import { getDate, success } from '../utils'

export const createConfig = async (data, owner, slug) => {
  const slugExists = await Config.exists({ slug })

  if (slug && slugExists) {
    throw new Error('slug existed')
  }

  const config = new Config({
    data,
    owner,
    slug: slug || uuidv4(),
    created_at: getDate(),
    updated_at: getDate(),
  })

  await config.save()

  return success(config.toJSON())
}

export const getConfigList = async (filter) => {
  return await Config.find(filter).exec()
}

export const getMyConfig = async (owner) => {
  return success(await getConfigList({ owner }))
}

export const deleteConfig = async (owner, slug) => {
  const config = await Config.findOne({ owner, slug }).exec()
  if (isNil(config)) {
    throw new Error('no such config')
  }

  await config.deleteOne()

  return success(null)
}

export const modifyConfig = async (owner, slug, body) => {
  const config = await Config.findOne({ owner, slug }).exec()
  if (isNil(config)) {
    throw new Error('no such config')
  }

  if (!isNil(body.data)) {
    config.data = body.data
  }

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
