const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/student-api', {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("connection successfull.....");
    })
    .catch((err) => {
        console.log(err);
    });