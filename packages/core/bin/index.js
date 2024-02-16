#! /usr/bin/env node
const importLocal = require("import-local"); 
const {log} = require("@jj-cli/tools");

if(importLocal(__filename)){
    log("cli","正在使用jj-cli本地版本");
}else{
    require("../lib")(process.argv.slice(2));
}