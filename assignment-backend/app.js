const express=require("express");
const db=require('./database-model/databasemodel')
const routes=require('./routes/routes')
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const app=express();
port=process.env.PORT;

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
    'https://majestic-kangaroo-904e17.netlify.app', 
  ];
  
  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
  app.use(cors(corsOptions));

app.use('/api', routes);
  
 



app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});
