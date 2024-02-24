'use strict';

const {Commander} = require("@jj-cli/commands");


class Init extends Commander{
  
  init(){
    console.log("开始初始化")
  }
  exec(){
    console.log("开始执行")
  }
}


function init(args) {

  return new Init(args);
}

module.exports = init;
