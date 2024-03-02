const log = require("./log");
const checkRoot = require("./checkRoot");
const checkUserHome = require("./checkUserHome");
const checkEnv = require("./checkEnv");
const checkOption = require("./checkOption");
const { checkUpdate, getPkgLatestVersion } = require("./checkUpdate");
const { checkNodeVersion, checkPkgVersion } = require("./checkVersion");
const getRegistry = require("./getRegistry");
const compatibleSep = require("./compatibleSep");
const {spawn,spawnSync} = require("./spawn");
const isDirEmpty = require("./isDirEmpty");
const isValidateProjectName = require("./isValidateProjectName");
const {request,HTTPCODE} = require("./request");
const getProjectTempalteInfo = require("./getProjectTempalteInfo");
const loading = require("./loading");
const renderTemplate = require("./renderTemplate");


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
  isDirEmpty,
  isValidateProjectName,
  request,
  spawn,
  spawnSync,
  getProjectTempalteInfo,
  HTTPCODE,
  renderTemplate,
  loading
}