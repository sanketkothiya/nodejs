const chalk=require("chalk");
const validator=require("validator");

// console.log(chalk.blue.underline.inverse("false"));
const res= validator.isEmail("sanket@sanket.com");
console.log(res ? chalk.green.inverse(res) : chalk.red.inverse(res));

