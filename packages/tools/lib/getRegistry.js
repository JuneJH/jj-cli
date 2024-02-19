
const REGISTRYURL = 'https://registry.npmjs.org';
const TBREGISTRYURL = "https://registry.npmmirror.com";

function getRegistry(isTb = false) {
    if (!isTb) {
        return TBREGISTRYURL;
    }
    return REGISTRYURL;
}

module.exports = getRegistry;