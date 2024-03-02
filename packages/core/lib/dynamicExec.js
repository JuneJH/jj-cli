const path = require("path");
const PackageManage = require("@jj-cli/packageManage");
const { log, spawn } = require("@jj-cli/tools");
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
    const main = path.resolve(__dirname,"../../init/lib/index.js") ||  pkgm.getFileRootPath();
    if (main) {
        try {
            const _args = Array.from(args);
            const cmd = _args[_args.length - 1];
            const parmas = Object.create(null);
            Object.keys(cmd).forEach(key => {
                if (cmd.hasOwnProperty(key) && !key.startsWith("_")
                    && key !== "parent") {
                    parmas[key] = cmd[key];
                }
            })
            _args[_args.length - 1] = parmas;
            const code = `require('${main}').call(null,${JSON.stringify(_args)})`;
            const child = spawn("node", ["-e", code], {
                cwd: process.cwd(),
                stdio: "inherit",
            })

            child.on("error", e => {
                log.error(e.message);
                process.exit(1);
            })
            child.on("exit", e => {
                process.exit(e);
            })
        } catch (error) {
            log.error(error.message)
        }

    }




}
module.exports = dynamicExec;


