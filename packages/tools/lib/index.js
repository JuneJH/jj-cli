const log = require("./log");
const checkRoot = require("./checkRoot");
const checkUserHome = require("./checkUserHome");
const checkEnv = require("./checkEnv");
const checkOption = require("./checkOption");
const { checkUpdate, getPkgLatestVersion } = require("./checkUpdate");

const { checkNodeVersion, checkPkgVersion } = require("./checkVersion");
const getRegistry = require("./getRegistry");
const compatibleSep = require("./compatibleSep");



module.exports = {
  checkNodeVersion,
  checkPkgVersion,
  checkRoot,
  checkUserHome,
  checkEnv,
  checkOption,
  checkUpdate,
  getRegistry,
  getPkgLatestVersion,
  compatibleSep,
  log,
}