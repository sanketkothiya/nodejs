const path= require("path");

console.log(path.dirname("E:/nodejs 2021 THAPA TECHNICAL/pathjs/path.js"));
console.log(path.extname("E:/nodejs 2021 THAPA TECHNICAL/pathjs/path.js"));
console.log(path.basename("E:/nodejs 2021 THAPA TECHNICAL/pathjs/path.js"));

const mypath = path.parse("E:/nodejs 2021 THAPA TECHNICAL/pathjs/path.js");
console.log(mypath.root);