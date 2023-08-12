import mongoose from 'mongoose'

const ConfigSchema = {
  data: String,
  owner: Number,
  name: String,
  slug: String,
  created_at: String,
  updated_at: String,
}

const schema = new mongoose.Schema(ConfigSchema)

const Config = mongoose.model('Config', schema)

export default Config
