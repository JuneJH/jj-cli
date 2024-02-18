const {
  log,
  checkNodeVersion,
  checkPkgVersion,
  checkRoot,
  checkEnv,
  checkOption,
  checkUpdate,
  checkUserHome
} = require("@jj-cli/tools");
const { createCommander, createYargs } = require("@jj-cli/commands")
async function cli() {
  try {
    checkPkgVersion();
    checkNodeVersion();
    checkRoot();
    checkUserHome();
    checkEnv();
    checkOption();
    const { checkVersionRes, currentVersion } = await checkUpdate();
    if (checkVersionRes && checkVersionRes.length > 0) {
      log.warn(`当前版本(${currentVersion})可更新：可选版本:${checkVersionRes.join(",")}`)
    }
    createYargs();
  } catch (error) {
    log.error(error)
  }
}

module.exports = cli;