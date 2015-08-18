#!/usr/bin/env node
/**
 * re-create shrinkwrap json if package.json dependencies have changed
 * requires Node >= 0.11
 *
 * @author Jingwei "John" Liu <liujingwei@gmail.com>
 **/

var exec = require("../lib/exec");
var runInstall = require("../lib/npm-install");
var diffDeps = require("../lib/diff-deps");
var getPrevious = require("../lib/get-previous-pkg");
var getCurrent = require("../lib/get-current-pkg");

module.exports = run;
function run() {
  Promise.resolve()
  // get npm/project root dir
  .then(exec.raw("npm", ["prefix"], {isSilent: true}))
  // chdir to npm/project root dir
  .then(process.chdir)
  // check if package.json has uncommitted change
  .then(exec.raw("sh", ["-c", "git status --porcelain -uno | grep package.json | wc -l | awk '{print $1}'"], {isSilent: true}))
  // read current and previous pkg file
  .then(function(packageFileChanged) {
    return Promise.all([getPrevious(packageFileChanged), getCurrent()]);
  })
  // diff dependencies
  .then(function(arr) {
    return diffDeps.apply(null, arr.map(function(a) {
      var pkg = a ? JSON.parse(a) : {};
      return pkg && pkg.dependencies;
    }));
  })
  // install new package/version
  .then(runInstall)
  // maintenance: prune extraneous packages
  .then(exec("npm", ["prune"]))
  // update shrinkwrap file
  .then(exec(__dirname + "/shrinkwrap.js", []))
  // log finish/error
  .then(function() {
    console.log("Updated shrinkwrap file");
  }, function(e) {
    console.error(e.stack || e.toString());
  })
}

if (require.main === module) {
  run();
}
