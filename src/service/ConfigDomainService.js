import ConfigDomain from '../model/ConfigDomain'
import Site from '../model/Site'
import { isNil, union } from 'lodash-es'

export const updateConfigDomin = async (id) => {
  let cm = await ConfigDomain.findOne({ config: id }).exec()
  if (isNil(cm)) {
    cm = new ConfigDomain({
      config: id,
      domains: [],
    })
  }

  const sites = await Site.$where(`this.configs.includes('${id}')`).exec()

  cm.domains = sites.reduce((prev, site) => {
    return union(prev, site.domains)
  }, [])

  await cm.save()

  return cm
}

export const domainGate = async (id, origin) => {
  let cm = await ConfigDomain.findOne({ config: id }).exec()
  if (isNil(cm)) {
    return false
  }

  return cm.domains.includes(origin)
}
