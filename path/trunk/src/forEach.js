// An implementation of Array.prototype.forEach for old browsers that don't have one.

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(iterator, context) {
    var thisObj = Object(this);
    var len = thisObj.length >>> 0;
    for (var i = 0; i < len; ++i) {
      if (i in thisObj) {
        iterator.call(context, thisObj[i], i, thisObj);
      }
    }
  };
}
