const mongoose = require('mongoose')
const subscriberModel = require('./models/subscribers')
const data = require('./data')
require('dotenv').config()

// Connect to DATABASEconst 
DATABASE_URL = "mongodb://127.0.0.1:27017/subscribers";

// Connect to Cloud DATABASE (MongoDB Atlas BATABASE)
//const DATABASE_URL = process.env.MONGO_URI
mongoose.connect(DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Database created...'))

const refreshAll = async () => {
    await subscriberModel.deleteMany({})
    // console.log(connection)
    await subscriberModel.insertMany(data)
    await mongoose.disconnect();
}
refreshAll()