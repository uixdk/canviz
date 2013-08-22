// Constants
var KAPPA = 0.5522847498;

// Constructor
function Ellipse(cx, cy, rx, ry, options) {
  if (!(this instanceof Ellipse)) return new Ellipse(cx, cy, rx, ry, options);
  this.cx = cx; // center x
  this.cy = cy; // center y
  this.rx = rx; // radius x
  this.ry = ry; // radius y
  Path.call(this, [], options);
}

// Parent
var Path = require('./Path.js');
Ellipse.prototype = Path();

// Prototype
Ellipse.prototype.constructor = Ellipse;
Ellipse.prototype.offset = function (dx, dy) {
  this.cx += dx;
  this.cy += dy;
  return this;
};
Ellipse.prototype.setupSegments = function () {
  this.addBezier([
    Point(this.cx, this.cy - this.ry),
    Point(this.cx + KAPPA * this.rx, this.cy - this.ry),
    Point(this.cx + this.rx, this.cy - KAPPA * this.ry),
    Point(this.cx + this.rx, this.cy)
  ]);
  this.addBezier([
    Point(this.cx + this.rx, this.cy),
    Point(this.cx + this.rx, this.cy + KAPPA * this.ry),
    Point(this.cx + KAPPA * this.rx, this.cy + this.ry),
    Point(this.cx, this.cy + this.ry)
  ]);
  this.addBezier([
    Point(this.cx, this.cy + this.ry),
    Point(this.cx - KAPPA * this.rx, this.cy + this.ry),
    Point(this.cx - this.rx, this.cy + KAPPA * this.ry),
    Point(this.cx - this.rx, this.cy)
  ]);
  this.addBezier([
    Point(this.cx - this.rx, this.cy),
    Point(this.cx - this.rx, this.cy - KAPPA * this.ry),
    Point(this.cx - KAPPA * this.rx, this.cy - this.ry),
    Point(this.cx, this.cy - this.ry)
  ]);
};

// Exports
module.exports = Ellipse;

// Dependencies
var Point = require('./Point.js');
