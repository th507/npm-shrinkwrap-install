var child = require("child_process");
var thenable = require("./thenable");

module.exports = thenable(function(cmd, args) { return exec(cmd, args)});
module.exports.raw = thenable(exec);

function exec(cmd, args, opts) {
  opts = opts || {};
  var isSilent = opts.isSilent;
  return new Promise(function(resolve, reject) {  
    var _child = child.spawn(cmd, args, opts);

    var out = "";
    _child.stdout.on("data", function(data) {
      out += data;
      if (!isSilent) process.stdout.write(data);
    });

    var err = "";

    _child.stderr.on("data", function(data) {
      err += data;
      process.stderr.write(data);
    });

    _child.on("close", function(code) {
      if (err) return reject(err);

      resolve(out.trim("\n"));
    });
  });
}

