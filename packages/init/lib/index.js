'use strict';

const {Commander} = require("@jj-cli/commands");


class Init extends Commander{

}


function init(args) {
  return new Init(args);
}

module.exports = init;
