const os=require("os");

console.log(os.arch());
console.log(os.hostname());
console.log(os.platform());y

console.log(os.tmpdir());
console.log(os.type());

// const freemem=os.freemem();
// console.log(`${freemem/1024/1024/1024}`);


const freemem=os.totalmem();
console.log(`${freemem/1024/1024/1024}`);
