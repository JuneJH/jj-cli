const log = require("./log");
const pkg = require("../../../lerna.json");
function checkPkgVersion() {
    log.info("cli version", pkg.version);
}

function checkNodeVersion() {
    log.info("node version", process.version);
}

module.exports = {
    checkNodeVersion,
    checkPkgVersion
}