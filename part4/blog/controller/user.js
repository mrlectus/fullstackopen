import express from 'express';
import bcrypt from 'bcrypt';
import  User  from '../model/user.js';

const userRouter = express.Router();


userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  const salt = 10;
  const hash = await bcrypt.hash(password, salt);
  console.log(hash);
  const user = new User({
    username,
    name,
    password: hash,
  })

  const userSaved = await user.save();
  response.status(201).json(userSaved);
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
})

export default userRouter;
