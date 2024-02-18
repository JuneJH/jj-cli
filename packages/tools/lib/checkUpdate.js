const axios = require('axios');
const urlJoin = require('url-join');
const semver = require('semver');
const pkg = require("../package.json");

const REGISTRYURL = 'https://registry.npmjs.org';
const TBREGISTRYURL = "https://registry.npmmirror.com"
/**
 * 检查是否需要升级
 * @param {*包名} n 
 * @param {*版本} v 
 * @returns 检查可用于更新版本
 */
async function checkUpdate(n, v) {
    const pkgName = n || pkg.name;
    const version = v || pkg.version;
    const versions = await getPkgVersionNpm(pkgName);
    const checkVersionRes = semverVersion(version, versions);
    return { checkVersionRes, currentVersion: version };
}

async function getPkgVersionNpm(pkgName) {
    const url = urlJoin(TBREGISTRYURL, pkgName);
    const res = await axios.get(url);
    if (res.status == 200) {
        return Object.keys(res.data.versions);
    }
    return [];
}
function semverVersion(orginVersion, versions) {
    return versions.filter(v => semver.satisfies(v, `>${orginVersion}`)).sort((a, b) => semver.gt(a, b) ? -1 : 1)
}
module.exports = checkUpdate;