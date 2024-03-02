'use strict';
const inquirer = require('inquirer');
const fs = require("fs");
const fse = require('fs-extra');
const path = require("path");
const userHome = require("user-home");
const { Commander } = require("@jj-cli/commands");
const { spawnSync,renderTemplate, isDirEmpty, isValidateProjectName,loading, getProjectTempalteInfo, HTTPCODE,log } = require("@jj-cli/tools");
const semver = require("semver");
const kebabCase = require("kebab-case");
const PackageManage = require("@jj-cli/packagemanage");
const PROJECT = "project";
const COMPONENT = "component";
const INSTALLMODECUSTOM = "custom";

const EXECNPM = ["npm","yarn"];
class Init extends Commander {

  init() {
    this.projectName = this._args[0] || "";
    this.force = false;
  }
  async exec() {
    try {
      const projectInfo = await this.preCheck();
      if (projectInfo && projectInfo.template) {
        this.projectInfo = projectInfo;
        await this.downloadTemplate();
        await this.installTemplate();
      }
    } catch (error) {
      log.error(error.message);
    }
  }
  
  async preCheck() {
    const cwd = process.cwd();
    if (!isDirEmpty(cwd, ["node_modules"])) {
      let isContinue = false;
      if (!this.force) {
        isContinue = (await inquirer.prompt({
          type: "confirm",
          name: "isContinue",
          message: "当前文件夹不为空，是否清空后继续？",
          default: "false"
        })).isContinue;

        if (!isContinue) {
          return;
        }
      }
      if (isContinue || this.force) {
        isContinue = (await inquirer.prompt({
          type: "confirm",
          name: "isContinue",
          message: "即将清空该目录，请注意保存相关数据，是否继续？",
          default: "false"
        })).isContinue
      }
      if (isContinue) {
        const close = loading("正在清空目录...");
        fse.emptyDirSync(cwd);
        close();
      }
    }
    return await this.getProjectInfo();
  }

  async getProjectInfo() {
    const { type } = await inquirer.prompt({
      type: "list",
      name: "type",
      message: "请选择创建类型？",
      default: PROJECT,
      choices: [{
        name: "项目",
        value: PROJECT
      }, {
        name: "组件",
        value: COMPONENT
      }],
    });
    const tempalteType = this.getProjectType(type);
    const res = await getProjectTempalteInfo();
    if (res.code === HTTPCODE.success && !res.data.data) {
      throw new Error("项目模版列表信息获取失败,请检查网络原因");
    }
    this.templateListInfo = res.data.data.filter(template =>template.tag.includes(type));
    if(this.templateListInfo && this.templateListInfo.length === 0){
      throw new Error(`${tempalteType}类型模版的数量为0,请等待创建！！！`);
    }
    let projectInfo = { type,projectName:this.projectName };
    const tips = [];

    tips.push({
      type:"list",
      name:"templateId",
      message:`请选择${tempalteType}类型模版`,
      choices:this.templateListInfo.map(template=>{
        return {
          value:template.id,
          name:template.label
        }
      })
    })
    tips.push({
      type: 'input',
      name: 'projectName',
      message: `请输入${tempalteType}名称`,
      default: projectInfo.projectName,
      validate: function (v) {
        const done = this.async();
        setTimeout(function () {
          if (!isValidateProjectName(v)) {
            done(`请输入合法的${tempalteType}名称`);
            return;
          }
          done(null, true);
        }, 0);
      },
      filter: function (v) {
        return v;
      },
    })
    tips.push({
      type: 'input',
      name: 'version',
      message: `请输入${tempalteType}版本`,
      default: '1.0.0',
      validate: function (v) {
        const done = this.async();
        setTimeout(function () {
          if (!(!!semver.valid(v))) {
            done(`请输入合法的${tempalteType}名称`);
            return;
          }
          done(null, true);
        }, 0);
      },
      filter: function (v) {
        return v;
      },
    })
    tips.push({
      type: 'input',
      name: 'description',
      message: `请输入${tempalteType}描述信息`,
      default: '> TODO: 项目描述信息',
    })

    const info = await inquirer.prompt(tips);
    this.projectName = this.transferProjectName(info.projectName);
    this.template = this.transferTemplateInfo(info.templateId);
    return { ...projectInfo, ...info,projectName:this.projectName,template:this.template };
  }

  async downloadTemplate() {

    const root = path.resolve(userHome,".jj-cli","template");
    const pkg = new PackageManage({
      root,
      pkgName:this.template.pkgName,
      pkeVersion:this.template.version,
    });
    if(!await pkg.exists()){
     try {
      await pkg.install();;
     } catch (error) {
      throw error;
     }
    }else{
      try {
        await pkg.update();
      } catch (error) {
        throw error;
      }
    }
    this.templatePkgm = pkg;
  }

  async installTemplate(){
    if(this.template && this.template.type === INSTALLMODECUSTOM){
      await this.installCustomTemplate();
    }else{
      await this.installStandardTeamplte();
    }
  }

  async installStandardTeamplte(){
    const targetPath = process.cwd();
    const templatePath = path.resolve(this.templatePkgm.computerPkgPath(),this.template.name);
    await this.copyFiles(targetPath,templatePath);
    const {install_cmd,start_cmd,ignore=[]} = this.template;
    await renderTemplate({dir:process.cwd(),ignore,data:this.projectInfo});
    install_cmd && await this.execCmd(install_cmd,`安装依赖失败！请手动重试: ${install_cmd}`);
    start_cmd && await this.execCmd(start_cmd,`启动项目失败！请手动重试: ${start_cmd}`);
  }
  async copyFiles(targetPath,templatePath){
    try {
      fse.ensureDirSync(templatePath);
      fse.ensureDirSync(targetPath);
      fse.copySync(templatePath,targetPath);
    } catch (error) {
      throw error;      
    } finally{
      log.info("安装成功")
    }

  }

  async installCustomTemplate(){
    const targetPath = process.cwd();
    const templatePath = path.resolve(this.templatePkgm.computerPkgPath(),this.template.name);
    const mainJsPath = path.resolve(templatePath,"./main.js");
    const options = {
      template:this.template,
      projectInfo:this.projectInfo,
      templatePath,
      cwd:targetPath
    }
    if(fs.existsSync(templatePath)){
      log.info("开始执行自定义模版");
      const MainJS = require(mainJsPath);
      const mainjs = new MainJS(options);
      await mainjs.init();
      await this.copyFiles(targetPath,path.resolve(templatePath,"template"));
      mainjs.onCopyAfter && await mainjs.onCopyAfter(); // 文件复制完成后钩子函数
      const {install_cmd,start_cmd,ignore=[]} = this.template;
      const {projectInfo={}}= mainjs || {};
      await renderTemplate({dir:process.cwd(),ignore,data:{...this.projectInfo,...projectInfo}});
      mainjs.onRenderTemplateAfter && await mainjs.onCopyAfter(); // 文件复制完成后钩子函数
      install_cmd && await this.execCmd(install_cmd,`安装依赖失败！请手动重试: ${install_cmd}`);
      start_cmd && await this.execCmd(start_cmd,`启动项目失败！请手动重试: ${start_cmd}`);
    }else{
      throw new Error("自定义模版入口文件不存在，请加入main.js文件")
    }
    // this.template.name += "template";
  }


  async execCmd(cmd,msg){
    let res = null;
    if(cmd){
      const cmdArray = cmd.split(" ");
      if(!EXECNPM.includes(cmdArray[0])){
        throw new Error(`该库的执行命令不存在:${cmdArray[0]}`)
      }
      const args = cmdArray.slice(1);
      res = await spawnSync(cmdArray[0],args,{
        stdio:"inherit",
        cwd:process.cwd()
      })
    }
    if(res != 0){
      throw new Error(msg);
    }
    return res;
  }


  getProjectType(type) {
    return type === PROJECT ? "项目" : "组件";
  }
  transferProjectName(name){
    if(name){
      return kebabCase(name).replace(/^-/,"");
    }
    throw new Error("未获取到项目名称信息");
  }
  transferTemplateInfo(id){
    return this.templateListInfo.find(template=>template.id === id);
  }
}


function init(args) {

  return new Init(args);
}

module.exports = init;
