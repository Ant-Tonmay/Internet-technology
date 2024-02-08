const express = require('express')
const app = express();
const fs = require('fs')
const path = require('path')

let PORT = 3000

app.set('view engine','ejs');


app.use(express.json({ limit: '50mb' })); // Adjust the limit as needed

// Middleware to handle URL-encoded data with size limit
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Adjust the limit as needed

//Import Routes
const homepage = require('./routes/home-page')
const upload = require('./routes/upload-data')
const view = require('./routes/view-data')
app.use('/upload-data',upload)
app.use('/view-data',view)
app.use('/',homepage);
app.use(express.static(path.join(__dirname, 'uploads')))
app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT}`)
    console.log("http://192.168.0.102:3000")
})

