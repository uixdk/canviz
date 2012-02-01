//#include 'Path.js'

var Polygon = exports.Polygon = function(points, options) {
		this.points = points || [];
		Path.call(this, [], options);
};
Polygon.prototype = new Path();
Polygon.prototype.constructor = Polygon;
Polygon.prototype.offset = function(dx, dy) {
		var pointsLength = this.points.length;
		for (var i = 0; i < pointsLength; ++i ) {
			this.points[i].offset(dx, dy);
		}
		return this;
};
Polygon.prototype.setupSegments = function() {
		var pointsLength = this.points.length;
		for (var i = 0; i < pointsLength; ++i) {
			var next = i + 1;
			if (this.points.length == next) next = 0;
			this.addBezier([
				this.points[i],
				this.points[next]
			]);
		}
};
