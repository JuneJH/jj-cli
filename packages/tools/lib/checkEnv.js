const dotenv = require("dotenv");
const userHome = require("user-home");
const path = require("path");
const pathExist = require("path-exists").sync;
/**
 * 检查环境变量
 */
function checkEnv() {
    const envPath = path.resolve(userHome, ".env");
    if (pathExist(envPath)) {
        dotenv.config({
            path: envPath
        })
    }
}

module.exports = checkEnv;