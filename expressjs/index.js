const express = require('express');
const app = express();
const port=8000;
const path = require('path');


// const staticPath = path`.join(__dirname, '../public');
// console.log(staticPath);
// app.use(express.static(staticPath));`

app.get("/",(req,res)=>{
    res.send("my name is sanket");

});

// app.get("/temp1",(req,res)=>{
//     res.write("<h1> helllo this is used by h1 tag </h1>");
//     res.write("<h1> helllo this is used by h1 tag </h1>");
//     res.send();

// });
// app.get("/about",(req,res)=>{
//     res.send(" this is about page");

// });
// app.get("/contact",(req,res)=>{
//     res.status(200).send(" this is contact page");

// });
// app.get("/json",(req,res)=>{
//     res.send([
//         {
//         id:1,
//         name:"sanket",
//         profession:"computer engineer",
//         salary:"3000usd",
//     },
//         {
//         id:1,
//         name:"sanket",
//         profession:"computer engineer",
//         salary:"3000usd",
//     }
// ]);

// });

app.listen(port,()=>{
    console.log("you listening the port no is" + " "+ port);
});

