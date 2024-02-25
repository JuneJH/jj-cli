'use strict';
const inquirer = require('inquirer');
const fse = require('fs-extra');
const { Commander } = require("@jj-cli/commands");
const { isDirEmpty, isValidateProjectName } = require("@jj-cli/tools");
const semver = require("semver");

const PROJECT = "project";
const COMPONENT = "component";


class Init extends Commander {

  init() {
    this.projectName = this._args[0] || "";
    this.force = false;
  }
  async exec() {
    try {
      const projectInfo = await this.preCheck();
      console.log("获取到的项目信息", projectInfo)
    } catch (error) {
      console.log(error.message);
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
        fse.emptyDirSync(cwd);
      }
    }
    return await this.getProjectInfo();
  }

  async getProjectInfo() {

    const title = "项目"

    let projectInfo = {};
    let isProjectNameValidateRes = false;
    const tips = [];
    if (isValidateProjectName(this.projectName)) {
      isProjectNameValidateRes = true;
      projectInfo.projectName = this.projectName;
    }
    tips.push({
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
      }]
    })

    if (isProjectNameValidateRes) {
      tips.push({
        type: 'input',
        name: 'projectName',
        message: `请输入${title}名称`,
        default: '',
        validate: function (v) {
          const done = this.async();
          setTimeout(function () {
            if (!isValidateProjectName(v)) {
              done(`请输入合法的${title}名称`);
              return;
            }
            done(null, true);
          }, 0);
        },
        filter: function (v) {
          return v;
        },
      })
    }

    tips.push({
      type: 'input',
      name: 'version',
      message: `请输入${title}版本`,
      default: '1.0.0',
      validate: function (v) {
        const done = this.async();
        setTimeout(function () {
          if (!(!!semver.valid(v))) {
            done(`请输入合法的${title}名称`);
            return;
          }
          done(null, true);
        }, 0);
      },
      filter: function (v) {
        return v;
      },
    })

    const info = await inquirer.prompt(tips);

    return { ...projectInfo, ...info };

  }
}


function init(args) {

  return new Init(args);
}

module.exports = init;
