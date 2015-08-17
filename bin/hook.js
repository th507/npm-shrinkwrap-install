#!/usr/bin/env node
/**
 * npm-shrinkwrap-install hook
 * adding hook for post-install and post-uninstall
 *
 * largely based on npm package: uber/npm-shrinkwrap/bin/install.js
 **/
var path = require('path');
var fs = require('fs');
var parseArgs = require("minimist");

var exec = require("../lib/exec");

// npm-shrinkwrap-install version
var tool = require('../package.json');

module.exports = installHook;

if (require.main === module) {
  var args = parseArgs(process.argv.slice(2));

  Promise.resolve()
  .then(exec("npm", ["prefix"]))
  .then(function(baseDir) {
    // find root directory for package.json
    args.dirname = args.dirname || baseDir;

    return args;
  })
  .then(installHook);
}

function installHook(opts, callback) {
  callback = callback || function noop() {};

  var file = path.join(opts.dirname, 'package.json');

  var pkg;
  try {
    pkg = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    console.error("error reading package.json");

    return callback(e);
  }

  pkg.scripts = pkg.scripts || {};

  pkg.scripts.shrinkwrap = "npm-shrinkwrap";
  pkg.scripts["install"] = "npm-install";
  pkg.scripts["uninstall"] = "npm-install --uninstall";

  // write to devDependencies
  opts.packageVersion = opts.packageVersion || '~' + tool.version;
  opts.moduleName = opts.moduleName || tool.name;
  if (!opts.onlyScripts) {
      pkg.devDependencies = pkg.devDependencies || {};
      pkg.devDependencies[opts.moduleName] = opts.packageVersion;
  }
  else {
    console.log("skipping devDependencies");
  }

  fs.writeFile(file, JSON.stringify(pkg, null, 2) + '\n',
      'utf8', callback);

  console.log("wrote to package.json");
}
