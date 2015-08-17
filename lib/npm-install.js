var exec = require("./exec");

module.exports = runInstall;

function runInstall(args) {
  console.log("Updating dependencies:\n");
  console.log("npm " + args.join(" "));
  return exec("npm", args)();
}
