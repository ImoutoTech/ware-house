import mongoose from 'mongoose'

const SiteSchema = {
  domain: String,
  owner: String,
  configs: [],
  created_at: String,
  updated_at: String,
}

const schema = new mongoose.Schema(SiteSchema)

const Site = mongoose.model('Site', schema)

export default Site
