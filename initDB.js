const mongoose = require('mongoose');
module.exports = ()=>{
    mongoose.connect(process.env.MONGODB_URI,{
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log('Mongodb connected......');
    })
    .catch((err)=>{
        console.log(err.message);
    });

    mongoose.connection.on('connected',()=>{
        console.log('mongoose connected......');
    });

    mongoose.connection.on('error',error=>{
        console.log(error.message);
    })
}