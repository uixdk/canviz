var Point = exports.Point = function(x, y) {
		this.x = x;
		this.y = y;
};
Point.prototype = {
	constructor: Point,
	offset: function(dx, dy) {
		this.x += dx;
		this.y += dy;
		return this;
	},
	distanceFrom: function(point) {
		var dx = this.x - point.x;
		var dy = this.y - point.y;
		return Math.sqrt(dx * dx + dy * dy);
	},
	makePath: function(ctx) {
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x + .05, this.y);
	}
};
