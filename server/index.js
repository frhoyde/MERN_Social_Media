import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());


app.use('/posts', postRoutes);

const CONNECTION_URL = 'mongodb+srv://sazidaf:sazidaf123@cluster0.vj3tx7y.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true , useUnifiedTopology: true})
        .then(() => app.listen(PORT, () => console.log(`Server is running on port: localhost:${PORT}`)))
        .catch((error) => console.log(error.message));



//No longer needed for mongoose 6.0 and above
// mongoose.set('useFindAndModify', false);
// When the useFindAndModify option is set to false, 
// Mongoose will use the newer findOneAndUpdate and findOneAndDelete methods 
// instead of the deprecated findAndModify command. 
// This ensures compatibility with MongoDB 4.0 and above, and also ensures that any 
// future deprecation warnings related to findAndModify will not affect the application.