import express from 'express';
import { Blog } from '../model/blog.js';
import User from '../model/user.js';

export const blogRouter = express.Router();

blogRouter.get('/', async (_, response) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    response.status(500).send(error);
  }
})


blogRouter.post('/', async (request, response) => {
  const { title, author, url, user, likes } = request.body;
  const user_content = await User.findOne({ username: user });
  const {password, ...rest} = user_content;
  console.log(rest);
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: rest,
  })
  try {
    const savedBlog = await user_content.save()
    user_content.blog = user_content.blog.concat(savedBlog._id)
    await blog.save()
    response.json(savedBlog)
  } catch (error) {
    console.log(error);
  }
})

blogRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  await Blog.findByIdAndRemove(id);
  response.status(204).end();
})

blogRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  await Blog.findByIdAndUpdate(id, request.body, {
    new: true,
    runValidators: true
  })
  response.status(204).end();
})
