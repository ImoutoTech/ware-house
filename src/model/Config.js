import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const ConfigSchema = {
  data: String,
  owner: Number,
  name: String,
  slug: String,
  created_at: String,
  updated_at: String,
}

const schema = new mongoose.Schema(ConfigSchema)

schema.plugin(mongoosePaginate)

const Config = mongoose.model('Config', schema)

export default Config
