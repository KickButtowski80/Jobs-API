require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

const connectDB = require('./db/connect')

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)


// routes
app.get('/', (req, res) => {
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
      console.log(`Server is listening 📻 on port ${port}... 🚀`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
