const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const port = 3000;

//Set Path
const staticPath = path.join(__dirname, '../public');
let templatesPath = path.join(__dirname, '../templates/views');
let partialsPath = path.join(__dirname, '../templates/partials');

//To set the view engine -- hbs,pub,ejs
hbs.registerPartials(partialsPath);
app.set("view engine", "hbs");
app.set("views", templatesPath);

//------------------------------------------------------
// console.log(staticPath);
// app.use(express.static(staticPath));
//------------------------------------------------------


//Template engine Route
app.get("/", (req, res) => {
    res.render('index', {
        dynamicVal: "Jigar",
    });
})
app.get("/about", (req, res) => {
    res.render('about', {
        dynamicVal: "Jigar",
    });
})

app.get('/', (req, res) => {
    res.send("Hello From the Express JS!!!!!!!!!!!");
})

app.get('/about', (req, res) => {
    res.send("Hello From the Express JS About Us Page");
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: "Opps! Page not found.",
    })
})

app.listen(port, (req, res) => {
    console.log("listening at port " + port);
})