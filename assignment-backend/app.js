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
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

app.use('/api', routes);
  
 



app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});