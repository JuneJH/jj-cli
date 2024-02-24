const path = require("path");
const PackageManage = require("@jj-cli/packageManage");
const INITLIST = {
    init: "@jj-cli/init"
}
const CACHE_DIR = "cache_dep";

/**
 * 动态加载指令包
 */
async function dynamicExec() {
    const args = arguments;
    const homePath = process.env.CLI_HOME_PATH;
    const root = path.resolve(homePath, CACHE_DIR);
    const cmdObj = args[args.length - 1];
    const cmdName = cmdObj.name();
    const pkgName = INITLIST[cmdName];
    const pkgm = new PackageManage({
        root,
        pkgName,
        pkgVersion: "latest"

    })
    if (await pkgm.exists()) {
        await pkgm.update();
    } else {
        await pkgm.install();
    }
    const main = pkgm.getFileRootPath();
    const hander = require(main);
    console.log(hander())




}
module.exports = dynamicExec;