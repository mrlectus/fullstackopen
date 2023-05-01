import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const password = process.env.PASSWORD;
const url = `mongodb+srv://brown:${password}@cluster0.lhjvb6g.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url).catch(err => console.log(`cannot connect to database: ${err}`));

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    require: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (v) => {
        return /[0-9]{2,3}-[0-9]+/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    require: true
  },
})

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
export const Phone = mongoose.model('Phone', phoneSchema)
