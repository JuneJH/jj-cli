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
const { createCommander } = require("@jj-cli/commands");
const dynamicExec = require("./dynamicExec");
const pkg = require("../package.json");
async function cli() {
  try {
    preCheck();
    const program = createCommander({ version: pkg.version, pkgName: pkg.name, description: pkg.description });
    program
      .command("init [projectName]")
      .option("-f --force", "是否强制初始化项目")
      .action(dynamicExec);

    program.parse();
  } catch (error) {
    log.error(error)
  }
}


async function preCheck() {
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
}

module.exports = cli;