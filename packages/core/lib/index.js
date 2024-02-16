

const yargs = require('yargs/yargs');

const { hideBin } = require('yargs/helpers');
const dedent = require("dedent");
// const cli = yargs(hideBin(process.argv));
const { log, checkNodeVersion, checkPkgVersion, checkRoot } = require("@jj-cli/tools");

function cli() {
  try {
    checkPkgVersion();
    checkNodeVersion();
    checkRoot();
  } catch (error) {
    log.error(error)
  }
}


module.exports = cli;


// cli
// .usage("使用方法：jj-cli [指令] <参数>")
// .demandCommand(1,"最少需要一个指令")
// .strict()
// .alias("v","version")
// .alias("h","help")
// .alias("j","jj")
// .option("jj",{type:"boolean",description:"开启彩蛋"})
// .epilogue(dedent`快速建立项目
// 搞钱搞钱🚀`)
// .help()
// .argv;