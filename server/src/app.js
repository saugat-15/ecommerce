const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 5000;
require("dotenv").config();


const connectMongoose = require("./db/mongoose");
connectMongoose()

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))

const productsRouter = require('./Controller/productRouter');
const registerRouter = require('./Controller/registerRouter');
const loginRouter = require('./Controller/loginRouter');
// const { connect } = require('mongoose');

app.use('/products', productsRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)

app.listen(PORT, () => {
    console.log(`ecommerce server starting on port: ${PORT}`)
})