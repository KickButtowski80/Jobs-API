require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const express = require('express');
const app = express();

app.set('trust proxy', 1)
app.use(rateLimiter({
  windowsMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}))
app.use(helmet());
app.use(cors())
app.use(xss())

const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticateUser = require('./middleware/authentication')
const connectDB = require('./db/connect')

app.use(express.json());


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)


// routes
app.get('/jobs', (req, res) => {
  res.send('jobs api 👏');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log('db is connected...🔌')
    app.listen(port, () =>
      console.log(`Server is listening 📻 on port ${port}...🚀`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
