const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const Student = require('./module/student');
const router = require('./module/operations');

//for connecting db.js with app.js
require('./module/db');

app.use(express.json());
app.use(router);


app.listen(port, (req, res) => {
    console.log("listening on port " + port);
})