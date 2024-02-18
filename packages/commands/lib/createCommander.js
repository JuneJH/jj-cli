const { Command } = require('commander');

function createCommander({ version, pkgName, description }) {
  const program = new Command();

  program
    .name(pkgName)
    .description(description)
    .version(version);

  return program;
}

module.exports = createCommander;