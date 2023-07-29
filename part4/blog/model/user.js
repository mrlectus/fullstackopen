import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  password: String,
  blog: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.plugin(uniqueValidator);
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

const User = model('User', userSchema)

export default User
