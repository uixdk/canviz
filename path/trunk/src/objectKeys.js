// A minimal implementation of Object.keys for old browsers that don't have one.
// It's not being assigned to Object.keys since it is not a complete proper
// implementation: it does not work around the IE DontEnum bug, but that should
// be ok for our purposes.
// https://developer.mozilla.org/en/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug

var objectKeys = ('undefined' !== typeof Object.keys) ? Object.keys : (function() {
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  
  return function(object) {
    var keys = [];
    for (var name in object) {
      if (hasOwnProperty.call(object, name)) {
        keys.push(name);
      }
    }
    return keys;
  };
}());
