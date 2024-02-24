'use strict';

const path = require("path");
const pathExists = require("path-exists").sync;
const fse = require("fs-extra");
const npminstall = require("npminstall");
const pkgDir = require('pkg-dir').sync;
const semver = require('semver');
const { getPkgLatestVersion, getRegistry, compatibleSep } = require("@jj-cli/tools");
class PackageManage {

  constructor(options) {
    if (!options) {
      throw new Error("PackageManage初始化时必须传递options")
    }

    this.root = options.root;
    this.storeDir = path.join(this.root, "node_modules");
    this.pkgName = options.pkgName;
    this.pkgVersion = options.pkgVersion;
    this.cachePrefix = this.pkgName.replace("/", "_");
    this.cachePkgPath = this.computerPkgPath(this.pkgVersion);
  }

  async preHander() {
    if (this.storeDir && !pathExists(this.storeDir)) {
      fse.mkdirpSync(this.storeDir);
    }
    if (this.pkgVersion === "latest") {
      this.pkgVersion = await getPkgLatestVersion(this.pkgName);
    }
  }

  computerPkgPath(pkgVersion) {
    return path.resolve(this.storeDir, `${this.pkgName}`);
  }

  async exists() {
    if (this.storeDir) {
      await this.preHander();
      return pathExists(this.cachePkgPath);
    }
  }

  async install() {
    await this.preHander();
    return npminstall({
      root: this.root,
      storeDir: this.storeDir,
      registry: getRegistry(),
      pkgs: [{
        name: this.pkgName,
        version: this.pkgVersion
      }]
    })
  }

  // TODO 更新比对出现问题，不能比较缓存与线上版本
  async update() {
    await this.preHander();
    const latestPkgVersion = await getPkgLatestVersion(this.pkgName);
    const currentPkgVersion = this.getPkgCurrentVersion();
    if (!semver.gte(currentPkgVersion,latestPkgVersion)) {
      console.log("开始更新:",this.currentPkgVersion,"->",this.latestPkgVersion)
      await npminstall({
        root: this.root,
        storeDir: this.storeDir,
        registry: getRegistry(),
        pkgs: [{
          name: this.pkgName,
          version: this.pkgVersion
        }]
      });
      this.pkgVersion = latestPkgVersion;
    } else {
      this.pkgVersion = latestPkgVersion;
    }
  }
  _getPkgJson(targetPath) {
    const packageDir = pkgDir(targetPath);
    if (packageDir) {
      const packageJSON = require(path.resolve(packageDir, "package.json"));
      return packageJSON;
    }
    return null;
  }

  getPkgCurrentVersion(){
    const pkgJson = this._getPkgJson(path.resolve(this.storeDir, this.pkgName));
    return pkgJson ? pkgJson.version : null;
  }

  getFileRootPath() {
    const packageDir = path.resolve(this.storeDir, this.pkgName);
    const pkgJson = this._getPkgJson(packageDir);
    if (pkgJson && pkgJson.main) {
      return compatibleSep(path.resolve(packageDir, pkgJson.main));
    }
    return null;
  }
}


module.exports = PackageManage;