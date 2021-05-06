const http=require("http");
const fs= require("fs");


const server=http.createServer((req,res)=>{

    const data=fs.readFileSync(`../userApi/userapi.json`,"utf-8");
    const objdata=JSON.parse(data);

    if (req.url=="/") {
        res.end("this is main");
    }
    else if (req.url=="/about") {
        res.end("hello  about side");
    }
     else if (req.url=="/contact") {
        res.end("hello contact side");
    }
     else if (req.url=="/userapi") {
         res.writeHead(200,{"content-type":"application/json"});
        res.end(objdata[0].title);
    }
    else   {
        res.writeHead(404,{"content-type":"text/html"});
        res.end("<h1> 404 not foundhello from the home side</h1>");
    }
});

server.listen(8000,"127.0.0.1",()=>{
    console.log("listening to the port no 8000");
});