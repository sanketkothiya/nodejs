const http=require("http");
const { type } = require("os");

const server=http.createServer((req,res)=>{

    if (req.url=="/") {
        res.end("this is main")
    }
    else if (req.url=="/about") {
        res.end("hello  about side")
    }
     else if (req.url=="/contact") {
        res.end("hello contact side")
    }
    else   {
        res.writeHead(404,{"content-type":"text/html"});
        res.end("<h1> 404 not foundhello from the home side</h1>")
    }
});

server.listen(8000,"127.0.0.1",()=>{
    console.log("listening to the port no 8000");
});