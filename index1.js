const fs=require("fs");

fs.mkdirSync("sanket");

fs.writeFileSync("bio.txt","my name is sanket")

fs.appendFileSync("bio.txt","hello jigar");

const data=fs.readFileSync("bio.txt","utf8");

console.log(data);

fs.renameSync("bio.txt","mybio.txt");

fs.unlinkSync("mybio.txt");

fs.rmdirSync("sanket");
