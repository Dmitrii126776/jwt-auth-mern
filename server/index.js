const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');


const app = express();
dotenv.config()
mongoose.set('strictQuery', false);
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use('/api', router);
app.use(errorMiddleware)

async function dbConnect() {
    await mongoose.connect(process.env.DB_URL)
        .then(() => console.log('Connected with MongoDB!'))
        .catch(err => console.log(err));
}

dbConnect()

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
