const express = require('express');
const app = express();
const path = require('path');
const cokieParser = require('cookie-parser');
const userModel = require("./models/user.js");
const bcrypt = require ('bcrypt');
const { hash } = require('crypto');
const jwt = require ('jsonwebtoken');



app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cokieParser());

app.get('/', (req,res) => {
    res.render('\index');
});

app.post('/create', (req,res) =>{
    let{username, email, password, age} =req.body;
     
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) =>{

             let createduser = await userModel.create({
              username,
              email,
              password : hash,
              age
            })
            
            let token = jwt.sign({email}, "hsdgfghsjkiweuyrg");
            res.cookie("token", token); 
            res.send(createduser);
        })
        
    })

});

app.get ("/logout", (req, res) =>{
    res.cookie("token", "");
    res.redirect('/');
})
app.get("/login", (req, res) =>{
    res.render('login');
})
app.post("/login",async (req, res) =>{
    let user = await userModel.findOne({email: req.body.email});
    if(!user){
        return res.send ("something is wrong");
    }
    bcrypt.compare (req.body.password, user.password, (err, result) =>{
       if (result){
        let token = jwt.sign({email: user.email}, "hsdgfghsjkiweuyrg");
        res.cookie("token", token); 
        res.send('yes you can login');
       } 
    });
    
});



app.listen (3000);