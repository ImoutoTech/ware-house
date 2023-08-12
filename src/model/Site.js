import mongoose from 'mongoose'

const SiteSchema = {
  domains: [],
  owner: Number,
  name: String,
  configs: [],
  created_at: String,
  updated_at: String,
}

const schema = new mongoose.Schema(SiteSchema)

const Site = mongoose.model('Site', schema)

export default Site
