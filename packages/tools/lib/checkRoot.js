const rootCheck = require("root-check");
/**
 * 检查用户文件权限，如果用户权限太高后面操作文件时会出现权限不够
 * root-check自动降级
 */
function checkRoot() {
    rootCheck();
}

module.exports = checkRoot;