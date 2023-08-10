const express = require('express');
const createError =require('http-errors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//initialize DB 
require('./initDB')();

app.get('/',(_req,res,_next)=>{
    res.json({message:'It works fine .....', env_name:process.env.NAME});
});

app.get('/export',(req,res,_next)=>{
  // Retrieve collection schemas
  const collections = mongoose.connection.collections;
  // console.log(mongoose.connection.prototype.modelNames());
  // Iterate over each collection
  console.log('start');
  Object.values(collections).forEach((collection) => {
    const { collectionName } = collection;

   
        const Model = mongoose.model(collectionName);
            // Retrieve the schema
      const schema = Model.schema;

      // Log the schema
      console.log(`Schema for collection ${collectionName}:`);
      console.log(schema.obj);

    console.log('----------------------');
  });

  // Iterate over each collection
// for (const collectionName in collections) {
//   if (collections.hasOwnProperty(collectionName)) {
//     const collection = collections[collectionName];

//     // Retrieve model based on collection name
//     const Model = mongoose.model(collectionName);

//     // Retrieve the schema
//     const schema = Model.schema;

//     // Log the schema
//     console.log(`Schema for collection ${collectionName}:`);
//     console.log(schema.obj);
//     console.log('----------------------');
//   }
// }
});

const ProductRoute = require('./Routes/Product.route');
app.use('/products',ProductRoute);
//404 handler and pass to error handler
app.use((req, res, next)=>{
    /**
     * 
     *  const err = new Error('Not found');
     *  err.status = 404;
     *  next(err);
     */
    // You can use the above code if your not using the http-errors module
    next(createError(404, 'Not found'));
});

//Error handler
app.use((err, req, res, next)=>{
  res.status(err.status || 500);
  res.send({
    error:{
        status:err.status||500,
        message:err.message
    }
  })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT} ...`);
});