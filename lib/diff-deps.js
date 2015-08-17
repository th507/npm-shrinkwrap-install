module.exports = diff;

function diff(previous, current) {
  var currentKeys = Object.keys(current);
  var previousKeys = Object.keys(previous);

  // recognize dependencies deletion/addition
  var dependenciesChanged = currentKeys.filter(function(k) {
    var bool = previousKeys.indexOf(k) === -1;
    
    if (bool) {
      console.log("Detected new dependency:", k, "N/A", " ==> ", current[k]);
    }

    return bool;
  });

  currentKeys.forEach(function(k) {
    // version unchanged
    if (current[k] === previous[k]) return;

    if (dependenciesChanged.indexOf(k) !== -1) return;
    console.log("Detected version change:", k, previous[k], " ==> ", current[k]);
    dependenciesChanged.push(k);
  });


  var args = process.argv.slice(2);

  var hasNewPkg = args.some(function(a) {
    return a[0] !== "-";
  });

  var hasNewPkg = false;
  var isUninstall = false;

  args = args.filter(function(a) {
    if (a[0] !== "-") hasNewPkg = true;

    if (a === "--uninstall") {
      isUninstall = true;
      return false;
    }

    return true;
  });
  
  if (!dependenciesChanged.length && !hasNewPkg && !isUninstall) {
    // XXX: compare package.json with npm-shrinkwrap.json
    console.log("Dependencies unchanged");
    return process.exit();
  }
  
  if (isUninstall) {
    return ["uninstall"].concat(args);
  }
  

  return ["install"].concat(dependenciesChanged, args);
}
