import mongoose from 'mongoose'

const UserSchema = {
  id: Number,
  email: String,
  avatar: String,
  created_at: String,
}

const schema = new mongoose.Schema(UserSchema)

const User = mongoose.model('User', schema)

export default User
