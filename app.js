const express = require('express');
const app = express();
const path = require('path');
const cokieParser = require('cookie-parser');



app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cokieParser());

app.get('/', (req,res) => {
    res.render('\index');
});

app.listen (3000);