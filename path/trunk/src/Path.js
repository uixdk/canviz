//#include 'Bezier.js'
//#include 'objectKeys.js'
//#include 'Rect.js'

var Path = exports.Path = function(segments, options) {
		this.segments = segments || [];
		this.options = {};
		if (options) this.setOptions(options);
};
Path.prototype = {
	constructor: Path,
	x_fill: false,
	x_stroke: true,
	x_strokeType: 'solid',
	x_dashLength: 6,
	x_dotSpacing: 4,
	setOptions: function(options) {
		var keys = objectKeys(options);
		var keysLength = keys.length;
		for (var i = 0; i < keysLength; ++i) {
			var key = keys[i];
			if ('x_' == key.substr(0, 2)) {
				this[key] = options[key];
			} else {
				this.options[key] = options[key];
			}
		}
	},
	setupSegments: function() {},
	// Based on Oliver Steele's bezier.js library.
	addBezier: function(pointsOrBezier) {
		this.segments.push(pointsOrBezier instanceof Array ? new Bezier(pointsOrBezier) : pointsOrBezier);
	},
	offset: function(dx, dy) {
		if (0 == this.segments.length) this.setupSegments();
		var segmentsLength = this.segments.length;
		for (var i = 0; i < segmentsLength; ++i) {
			this.segments[i].offset(dx, dy);
		}
	},
	getBB: function() {
		if (0 == this.segments.length) this.setupSegments();
		var l, t, r, b, p = this.segments[0].points[0];
		l = r = p.x;
		t = b = p.y;
		var segmentsLength = this.segments.length;
		for (var i = 0; i < segmentsLength; ++i) {
			var points = this.segments[i].points;
			var pointsLength = points.length;
			for (var j = 0; j < pointsLength; ++j) {
				var point = this.segments[i].points[j];
				l = Math.min(l, point.x);
				t = Math.min(t, point.y);
				r = Math.max(r, point.x);
				b = Math.max(b, point.y);
			}
		}
		var rect = new Rect(l, t, r, b);
		return (this.getBB = function() {return rect;})();
	},
	isPointInBB: function(x, y, tolerance) {
		if ('undefined' === typeof tolerance) tolerance = 0;
		var bb = this.getBB();
		if (0 < tolerance) {
			bb = Object.clone(bb);
			bb.inset(-tolerance, -tolerance);
		}
		return !(x < bb.l || x > bb.r || y < bb.t || y > bb.b);
	},
	isPointOnPath: function(x, y, tolerance) {
		if ('undefined' === typeof tolerance) tolerance = 0;
		if (!this.isPointInBB(x, y, tolerance)) return false;
		var segmentsLength = this.segments.length;
		for (var i = 0; i < segmentsLength; ++i) {
			if (this.segments[i].isPointOnBezier(x, y, tolerance)) {
				return true;
			}
		}
		return false;
	},
	isPointInPath: function(x, y) {
		return false;
	},
	// Based on Oliver Steele's bezier.js library.
	makePath: function(ctx) {
		if (0 == this.segments.length) this.setupSegments();
		var segmentsLength = this.segments.length;
		for (var i = 0; i < segmentsLength; ++i) {
			this.segments[i].makePath(ctx, 0 == i);
		}
	},
	makeDashedPath: function(ctx, dashLength, firstDistance, drawFirst) {
		if (0 == this.segments.length) this.setupSegments();
		var info = {
			drawFirst: ('undefined' === typeof drawFirst) ? true : drawFirst,
			firstDistance: firstDistance || dashLength
		};
		var segmentsLength = this.segments.length;
		for (var i = 0; i < segmentsLength; ++i) {
			info = this.segments[i].makeDashedPath(ctx, dashLength, info.firstDistance, info.drawFirst);
		}
	},
	makeDottedPath: function(ctx, dotSpacing, firstDistance) {
		if (0 == this.segments.length) this.setupSegments();
		if (!firstDistance) firstDistance = dotSpacing;
		var segmentsLength = this.segments.length;
		for (var i = 0; i < segmentsLength; ++i ) {
			firstDistance = this.segments[i].makeDottedPath(ctx, dotSpacing, firstDistance);
		}
	},
	draw: function(ctx) {
		ctx.save();
		var keys = objectKeys(this.options);
		var keysLength = keys.length;
		for (var i = 0; i < keysLength; ++i) {
			var key = keys[i];
			ctx[key] = this.options[key];
		}
		if (this.x_fill) {
			ctx.beginPath();
			this.makePath(ctx);
			ctx.fill();
		}
		if (this.x_stroke) {
			switch (this.x_strokeType) {
				case 'dashed':
					ctx.beginPath();
					this.makeDashedPath(ctx, this.x_dashLength);
					break;
				case 'dotted':
					if (ctx.lineWidth < 2) ctx.lineWidth = 2;
					ctx.beginPath();
					this.makeDottedPath(ctx, this.x_dotSpacing);
					break;
				case 'solid':
				default:
					if (!this.x_fill) {
						ctx.beginPath();
						this.makePath(ctx);
					}
			}
			ctx.stroke();
		}
		ctx.restore();
	}
};
