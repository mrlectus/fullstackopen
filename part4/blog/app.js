import express from 'express';
import { PORT } from './utils/config.js';
import 'express-async-errors';
import { blogRouter } from './controller/blog.js';
import { info } from './utils/logger.js';
import cors from 'cors';
import userRouter from './controller/user.js';

export const app = express();

app.use(cors())
app.use(express.static('build'))
app.use(express.json());

app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})
