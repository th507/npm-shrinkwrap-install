var exec = require("./exec");

module.exports = getPrevious;

function getPrevious(packageFileChanged) {
  // get last package.json in the commit tree
  var treeish = (packageFileChanged[0] | 0) ? "HEAD" : "HEAD^";
  return exec.raw("sh", ["-c", "git archive " + treeish + " package.json | tar xf - -O"], {isSilent: true})();
}
