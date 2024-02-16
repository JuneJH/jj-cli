const log = require("./log");
const checkRoot = require("./checkRoot");
const { checkNodeVersion, checkPkgVersion } = require("./checkVersion");



module.exports = {
  checkNodeVersion,
  checkPkgVersion,
  checkRoot,
  log,
}