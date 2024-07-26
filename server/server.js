import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';
import router from './routes/stories.routes.js';

// skipMiddlewareFunction, above app.get or app.post
const app = express();
app.use(express.json(), cors());
app.use('/api', router);

dotenv.config();
const PORT = process.env.PORT;
dbConnect("countDB");

// ROUTES GOT AFTER MIDDLEWARE now wondering if I need to use app.use('/api', router), but we don't have an api, so I don't know


// this needs to be below the other code blocks
app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);

