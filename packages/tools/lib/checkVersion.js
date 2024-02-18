const log = require("./log");
const pkg = require("../../../lerna.json");
function checkPkgVersion(){
    log.info("version",pkg.version);
}

function checkNodeVersion(){

}

module.exports = {
    checkNodeVersion,
    checkPkgVersion
}