//#include 'Path.js'
//#include 'Point.js'

var Ellipse = exports.Ellipse = function(cx, cy, rx, ry, options) {
		this.cx = cx; // center x
		this.cy = cy; // center y
		this.rx = rx; // radius x
		this.ry = ry; // radius y
		Path.call(this, [], options);
};
Ellipse.prototype = new Path();
Ellipse.prototype.constructor = Ellipse;
Ellipse.prototype.offset = function(dx, dy) {
		this.cx += dx;
		this.cy += dy;
		return this;
};

var KAPPA = 0.5522847498;
Ellipse.prototype.setupSegments = function() {
		this.addBezier([
			new Point(this.cx, this.cy - this.ry),
			new Point(this.cx + KAPPA * this.rx, this.cy - this.ry),
			new Point(this.cx + this.rx, this.cy - KAPPA * this.ry),
			new Point(this.cx + this.rx, this.cy)
		]);
		this.addBezier([
			new Point(this.cx + this.rx, this.cy),
			new Point(this.cx + this.rx, this.cy + KAPPA * this.ry),
			new Point(this.cx + KAPPA * this.rx, this.cy + this.ry),
			new Point(this.cx, this.cy + this.ry)
		]);
		this.addBezier([
			new Point(this.cx, this.cy + this.ry),
			new Point(this.cx - KAPPA * this.rx, this.cy + this.ry),
			new Point(this.cx - this.rx, this.cy + KAPPA * this.ry),
			new Point(this.cx - this.rx, this.cy)
		]);
		this.addBezier([
			new Point(this.cx - this.rx, this.cy),
			new Point(this.cx - this.rx, this.cy - KAPPA * this.ry),
			new Point(this.cx - KAPPA * this.rx, this.cy - this.ry),
			new Point(this.cx, this.cy - this.ry)
		]);
};
