import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const SiteSchema = {
  domains: [],
  owner: Number,
  name: String,
  configs: [],
  created_at: String,
  updated_at: String,
}

const schema = new mongoose.Schema(SiteSchema)

schema.plugin(mongoosePaginate)

const Site = mongoose.model('Site', schema)

export default Site
