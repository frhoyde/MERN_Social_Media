import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import postRoutes from './routes/posts.js';

const app = express();

app.use('/posts', postRoutes);

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

const ConnectionURL = 'mongodb+srv://SazidAF:SazidAF123@cluster0.qseuhca.mongodb.net/?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5000;

mongoose.connect(ConnectionURL, { useNewUrlParser: true , useUnifiedTopology: true})
        .then(() => app.listen(PORT, () => console.log(`Server is running on port: localhost:${PORT}`)))
        .catch((error) => console.log(error.message));
