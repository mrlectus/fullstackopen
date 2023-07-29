import mongoose from 'mongoose'
import supertest from 'supertest'

import { app } from '../app.js'

const api = supertest(app)

test('api is working', async () => {
  const response = await api.get('/api/blogs')
  expect(response.status).toBe(200)
})

test('property id exist', async () => {
  const response = await api.get('/api/blogs')
  expect(response.status).toBe(200)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
  await mongoose.connection.close()
})
