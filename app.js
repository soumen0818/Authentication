const express = require('express');
const app = express();
const path = require('path');
const cokieParser = require('cookie-parser');
const userModel = require("./models/user.js");



app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cokieParser());

app.get('/', (req,res) => {
    res.render('\index');
});

app.post('/create',async (req,res) =>{
    let{username, email, password, age} =req.body;
    let createduser = await userModel.create({
      username,email,password,age
    })
    res.send('createduser');
});

app.listen (3000);