const { log, checkNodeVersion, checkPkgVersion, checkRoot } = require("@jj-cli/tools");
const { createCommander, createYargs } = require("@jj-cli/commands")
function cli() {
  try {
    checkPkgVersion();
    checkNodeVersion();
    checkRoot();
    createYargs();
  } catch (error) {
    log.error(error)
  }
}

module.exports = cli;