var fs = require("fs");

module.exports = getCurrent;

function getCurrent() {
  return new Promise(function(resolve, reject) {
    fs.readFile("package.json", {encoding: "utf8"}, function(err, data) {
      if (err) return reject(err);

      resolve(data);
    })
  });
}

