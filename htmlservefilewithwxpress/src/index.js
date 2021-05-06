const express = require('express');
const app = express();
const port=8000;
const path = require('path');
const hbs = require('hbs');

// console.log(__dirname);
const staticPath = path.join(__dirname, '../public');
let templatesPath = path.join(__dirname, '../templates/views');
let partialsPath = path.join(__dirname, '../templates/partials');
console.log(templatesPath);
console.log(partialsPath);
// console.log(staticPath);

// to state the view engine

hbs.registerPartials(partialsPath);
app.set('view engine','hbs');
app.set("views", templatesPath);
// app.use(express.static(staticPath));

app.get("/", (req, res) => {
    res.render('index', {
        name: "sanket",
    });
});

app.get("/about", (req, res) => {
    res.render('about');
});

app.get("/",(req,res)=>{
    res.send("my name is sanket");

});




app.listen(port,()=>{
    console.log("you listening the port no is" + " "+ port);
});