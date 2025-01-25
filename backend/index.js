const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8080;
require('./models/dbConnection')
const authRouter = require('./routes/authRouter')

app.use(cors())
app.get('/', (req,res)=>{
    res.send('Hello ladies and GentleMens')
})

app.use('/auth', authRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running at port: ${PORT}`);
    
})