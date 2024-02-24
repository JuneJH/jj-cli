'use strict';

const {Commander} = require("@jj-cli/commands");


class Init extends Commander{
  init(){
    console.log("shixian")
  }
}


function init(args) {
  return new Init(args);
}

module.exports = init;
