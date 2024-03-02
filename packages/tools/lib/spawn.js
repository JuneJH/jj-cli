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

function spawnSync(cmd, args, options) {
    return new Promise((resolve, reject) => {
        const p = spawn(cmd, args, options);
        p.on('error', e => {
            reject(e);
        })
        p.on("exit", e => {
            resolve(e);
        })
    })
}

module.exports = {spawn,spawnSync};