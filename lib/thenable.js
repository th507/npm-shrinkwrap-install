module.exports = thenable;
/**
 * @public
 *
 * haskell-ish currying
 **/
function thenable(fn, arr) {
  arr = arr || [];
  if (arr.length < fn.length) {
    return function() {
      var args = Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return thenable(fn, arr.concat(args));
    };
  }

  // create an extra function wrapper for .then() call
  return fn.apply.bind(fn, null, arr);
}
