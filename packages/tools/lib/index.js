const log = require("./log");
const checkRoot = require("./checkRoot");
const checkUserHome = require("./checkUserHome");
const checkEnv = require("./checkEnv");
const checkOption = require("./checkOption");
const checkUpdate = require("./checkUpdate");

const { checkNodeVersion, checkPkgVersion } = require("./checkVersion");



module.exports = {
  checkNodeVersion,
  checkPkgVersion,
  checkRoot,
  checkUserHome,
  checkEnv,
  checkOption,
  checkUpdate,
  log,
}