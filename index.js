const fs= require("fs");

fs.writeFileSync("read.txt","sanket kothiya");
fs.writeFileSync("read.txt","sanket kothiya");
fs.appendFileSync("read.txt","how are u sanet");


const buffer=fs.readFileSync("read.txt");
console.log(buffer);

org=buffer.toString();
console.log(org);

fs.renameSync("read.txt","rewrirte.txt");