function Polygon(points, options) {
		this.points = points || [];
		Path.call(this, [], options);
};
Polygon.prototype = new Path();
Polygon.prototype.constructor = Polygon;
Polygon.prototype.offset = function(dx, dy) {
		this.points.each(function(point) {
			point.offset(dx, dy);
		});
		return this;
};
Polygon.prototype.setupSegments = function() {
		this.points.each(function(p, i) {
			var next = i + 1;
			if (this.points.length == next) next = 0;
			this.addBezier([
				p,
				this.points[next]
			]);
		}.bind(this));
};
