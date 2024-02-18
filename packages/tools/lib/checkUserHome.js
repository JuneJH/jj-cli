const userHome = require("user-home");
const pathExist = require("path-exists").sync;

/**
 * 检查用户目录是否存在
 * user-home 利用自带模块os-homedir查找
 * path-exists 利用fs.accessSync查看是否存在目录
 */
function checkUserHome() {
    if (!userHome && !pathExist(userHome)) {
        throw new Error("当前用户主目录不存在！！！")
    }
}

module.exports = checkUserHome;