require('dotenv').config()
 
const connectDB = require('./db/connect')
const User = require('./models/User')

const resetUserDB = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await User.deleteMany()
        console.log('success reseting... 🍷')
        console.log('exiting... 🚪')
        process.exit(0)
    } catch (error) {
        console.log(`error 🚑 ${error}`)
        process.exit(1)
    }
}

resetUserDB()