import mongoose from 'mongoose'

const ConfigDomainSchema = {
  config: String,
  domains: [],
}

const schema = new mongoose.Schema(ConfigDomainSchema)

const ConfigDomain = mongoose.model('ConfigDomain', schema)

export default ConfigDomain
