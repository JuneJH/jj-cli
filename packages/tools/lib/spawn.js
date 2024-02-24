/**
 * 兼容win32平台
 * @param {*} cmd 
 * @param {*} args 
 * @param {*} options 
 * @returns 
 */
function spawn(cmd, args, options) {
    const isWin32 = process.platform == "win32";
    const command = isWin32 ? "cmd" : cmd;
    const cmdArgs = isWin32 ? ["/c"].concat(cmd, args) : args;
    return require("child_process").spawn(command, cmdArgs, options || {});
}

module.exports = spawn;