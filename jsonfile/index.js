const fs=require("fs");

const bioData={
    name:"sanket",
    surname:"kothiya",
    profession:"computer_engineer"
}

const jsondata=JSON.stringify(bioData);

// console.log(jsondata);

// console.log(bioData.name);

// fs.writeFile("jsonfile1.json",jsondata,(err)=>{
//     console.log("done");
// });


fs.readFile("jsonfile1.json","utf-8",(err,data)=>{
    const orgdata=JSON.parse(data);
    console.log(data);
    console.log(orgdata);
});