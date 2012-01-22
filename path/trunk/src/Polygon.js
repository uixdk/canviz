function Polygon(points, options) {
		this.points = points || [];
		Path.call(this, [], options);
};
Polygon.prototype = new Path();
Polygon.prototype.constructor = Polygon;
Polygon.prototype.offset = function(dx, dy) {
		for (var i = 0; i < this.points.length; ++i ) {
			this.points[i].offset(dx, dy);
		}
		return this;
};
Polygon.prototype.setupSegments = function() {
		for (var i = 0; i < this.points.length; ++i) {
			var next = i + 1;
			if (this.points.length == next) next = 0;
			this.addBezier([
				this.points[i],
				this.points[next]
			]);
		}
};
