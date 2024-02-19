'use strict';

const path = require("path");
const pathExists = require("path-exists").sync;
const fse = require("fs-extra");
const npminstall = require("npminstall");
const pkgDir = require('pkg-dir').sync;
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

  async update() {
    await this.preHander();
    const latestPkgVersion = await getPkgLatestVersion(this.pkgName);
    const latestPkgVersionPath = this.computerPkgPath(latestPkgVersion);
    if (!pathExists(latestPkgVersionPath)) {
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
  _getFileRootPath(targetPath) {
    const packageDir = pkgDir(targetPath);
    if (packageDir) {
      const packageJSON = require(path.resolve(packageDir, "package.json"));
      if (packageJSON && packageJSON.main) {
        return compatibleSep(path.resolve(packageDir, packageJSON.main));
      }
    }
    return null;
  }

  getFileRootPath() {
    return this._getFileRootPath(path.resolve(this.storeDir, this.pkgName));
  }
}


module.exports = PackageManage;