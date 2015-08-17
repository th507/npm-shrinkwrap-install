#!/usr/bin/env node

var cmd = require("@th507/npm-shrinkwrap/bin/cli.js");
var parseArgs = require("minimist");

var exec = require("../lib/exec");

module.exports = cmd;

if (require.main === module) {
  var args = parseArgs(process.argv.slice(2));

  Promise.resolve()
  .then(exec("npm", ["prefix"]))
  .then(function(baseDir) {
    // find root directory for package.json
    args.dirname = args.dirname || baseDir;

    return args;
  })
  .then(cmd);
}
