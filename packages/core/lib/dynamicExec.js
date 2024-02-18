

const INITLIST = {
    init: "@jj-cli/init"
}
const CACHE_DIR = "cache_dep";

/**
 * 动态加载指令包
 */
function dynamicExec() {
    console.log("执行动态init")
}
module.exports = dynamicExec;