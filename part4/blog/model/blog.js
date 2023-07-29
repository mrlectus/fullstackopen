import mongoose from 'mongoose';
mongoose.set('strictQuery', false)

const blogSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  url: String,
  likes: Number,
  user: String
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(process.env.MONGODB_URI)
