// rcs_bezier.js

Point = Class.create();
Point.prototype = {
	initialize: function(x, y) {
		this.x = x;
		this.y = y;
	},
	add: function(point) {
		return new Point(this.x + point.x, this.y + point.y);
	},
	multiply: function(mult) {
		return new Point(this.x * mult, this.y * mult);
	},
	distanceFrom: function(point) {
		var dx = this.x - point.x;
		var dy = this.y - point.y;
		return Math.sqrt(dx * dx + dy * dy);
	},
	draw: function(ctx) {
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x + 0.001, this.y);
	}
}

Bezier = Class.create();
Bezier.prototype = {
	initialize: function(points) {
		this.points = points;
		this.order = points.length;
	},
	// Based on Oliver Steele's bezier.js library.
	controlPolygonLength: function() {
		var len = 0;
		for (var i = 1; i < this.order; ++i) {
			len += this.points[i - 1].distanceFrom(this.points[i]);
		}
		return (this.controlPolygonLength = function() {return len;})();
	},
	// Based on Oliver Steele's bezier.js library.
	chordLength: function() {
		var len = this.points[0].distanceFrom(this.points[this.order - 1]);
		return (this.chordLength = function() {return len;})();
	},
	// From Oliver Steele's bezier.js library.
	triangle: function() {
		var upper = this.points;
		var m = [upper]
		for (var i = 1; i < this.order; ++i) {
			var lower = [];
			for (var j = 0; j < this.order - i; ++j) {
				var c0 = upper[j];
				var c1 = upper[j + 1];
				lower[j] = new Point((c0.x + c1.x) / 2, (c0.y + c1.y) / 2);
			}
			m.push(lower);
			upper = lower;
		}
		return (this.triangle = function() {return m;})();
	},
	// Returns two beziers resulting from splitting this bezier at t=0.5.
	// Based on Oliver Steele's bezier.js library.
	split: function() {
		var m = this.triangle();
		var leftPoints  = new Array(this.order);
		var rightPoints = new Array(this.order);
		for (var i = 0; i < this.order; ++i) {
			leftPoints[i]  = m[i][0];
			rightPoints[i] = m[this.order - 1 - i][i];
		}
		return [new Bezier(leftPoints), new Bezier(rightPoints)];
	},
	// Returns a bezier which is the left portion of this bezier cut at t.
	// Based on the algorithm in LBezier::TSplit by Llew S. Goodstadt.
	left: function(t) {
		// Don't know how to generalize this yet.
		if (4 != this.order) return;
		
		var s = 1 - t;
		var ss = s * s;
		var tt = t * t;
		
		var p = new Array(this.order);
		
		p[0] = this.points[0];
		p[1] = this.points[0].multiply(s     ).add(this.points[1].multiply(t         ));
		p[2] = this.points[0].multiply(ss    ).add(this.points[1].multiply(s  * t * 2)).add(this.points[2].multiply(tt        ));
		p[3] = this.points[0].multiply(s * ss).add(this.points[1].multiply(ss * t * 3)).add(this.points[2].multiply(s * tt * 3)).add(this.points[3].multiply(t * tt));
		
		return new Bezier(p);
	},
	// Returns a bezier which is the right portion of this bezier cut at t.
	// Based on the algorithm in LBezier::TSplit by Llew S. Goodstadt.
	right: function(t) {
		// Don't know how to generalize this yet.
		if (4 != this.order) return;
		
		var s = 1 - t;
		var ss = s * s;
		var tt = t * t;
		
		var p = new Array(this.order);
		
		p[0] = this.points[0].multiply(s * ss).add(this.points[1].multiply(ss * t * 3)).add(this.points[2].multiply(s * tt * 3)).add(this.points[3].multiply(t * tt));
		p[1] = this.points[1].multiply(ss    ).add(this.points[2].multiply(s  * t * 2)).add(this.points[3].multiply(tt        ));
		p[2] = this.points[2].multiply(s     ).add(this.points[3].multiply(t         ));
		p[3] = this.points[3];
		
		return new Bezier(p);
	},
	// Returns a bezier which is the portion of this bezier from t1 to t2.
	// Thanks to Peter Zin on comp.graphics.algorithms.
	mid: function(t1, t2) {
		return this.left(t2).right(t1 / t2);
	},
	// Returns points (and their corresponding times in the bezier) that form
	// an approximate polygonal representation of the bezier.
	// Based on the algorithm described in Jeremy Gibbons' dashed.ps.gz
	chordPoints: function() {
		var p = [{tStart: 0, tEnd: 0, dt: 0, p: this.points[0]}].concat(this._chordPoints(0, 1));
		return (this.chordPoints = function() {return p;})();
	},
	_chordPoints: function(tStart, tEnd) {
		var tolerance = 0.001;
		var dt = tEnd - tStart;
		if (this.controlPolygonLength() <= (1 + tolerance) * this.chordLength()) {
			return [{tStart: tStart, tEnd: tEnd, dt: dt, p: this.points[this.order - 1]}];
		} else {
			var tMid = tStart + dt / 2;
			var halves = this.split();
			return halves[0]._chordPoints(tStart, tMid).concat(halves[1]._chordPoints(tMid, tEnd));
		}
	},
	// Returns an array of times between 0 and 1 that mark the bezier evenly
	// in space.
	// Based on the algorithm described in Jeremy Gibbons' dashed.ps.gz
	markedEvery: function(distance, firstDistance) {
		var nextDistance = firstDistance || distance;
		var segments = this.chordPoints();
		var times = [0];
		var t = 0; // time
		var dt; // delta t
		var segment;
		var remainingDistance;
		for (var i = 1; i < segments.length; ++i) {
			segment = segments[i];
			segment.length = segment.p.distanceFrom(segments[i - 1].p);
//			$('output').innerHTML += 't [' + segment.tStart + ',' + segment.tEnd + '] segment length ' + segment.length + '<br/>';
			if (0 == segment.length) {
				t += segment.dt;
			} else {
				dt = nextDistance / segment.length * segment.dt;
//				$('output').innerHTML += 'nextDistance=' + nextDistance + ', dt=' + dt + '<br/>';
				segment.remainingLength = segment.length;
				while (segment.remainingLength >= nextDistance) {
					segment.remainingLength -= nextDistance;
					t += dt;
//					$('output').innerHTML += 'pushing t=' + t + '<br/>';
					times.push(t);
					if (distance != nextDistance) {
						nextDistance = distance;
						dt = nextDistance / segment.length * segment.dt;
//						$('output').innerHTML += 'nextDistance=' + nextDistance + ', dt=' + dt + '<br/>';
					}
				}
//				$('output').innerHTML += 'remainingLength=' + segment.remainingLength + '<br/>';
				nextDistance -= segment.remainingLength;
				t = segment.tEnd;
			}
		}
//		$('output').innerHTML += '<hr/>';
		return {times: times, nextDistance: nextDistance};
	},
	// Return the coefficients of the polynomials for x and y in t.
	// From Oliver Steele's bezier.js library.
	coefficients: function() {
		// This function deals with polynomials, represented as
		// arrays of coefficients.  p[i] is the coefficient of n^i.
		
		// p0, p1 => p0 + (p1 - p0) * n
		// side-effects (denormalizes) p0, for convienence
		function interpolate(p0, p1) {
			p0.push(0);
			var p = new Array(p0.length);
			p[0] = p0[0];
			for (var i = 0; i < p1.length; ++i) {
				p[i + 1] = p0[i + 1] + p1[i] - p0[i];
			}
			return p;
		}
		// folds +interpolate+ across a graph whose fringe is
		// the polynomial elements of +ns+, and returns its TOP
		function collapse(ns) {
			while (ns.length > 1) {
				var ps = new Array(ns.length-1);
				for (var i = 0; i < ns.length - 1; ++i) {
					ps[i] = interpolate(ns[i], ns[i + 1]);
				}
				ns = ps;
			}
			return ns[0];
		}
		// xps and yps are arrays of polynomials --- concretely realized
		// as arrays of arrays
		var xps = [];
		var yps = [];
		for (var i = 0, pt; pt = this.points[i++]; ) {
			xps.push([pt.x]);
			yps.push([pt.y]);
		}
		var result = {xs: collapse(xps), ys: collapse(yps)};
		return (this.coefficients = function() {return result;})();
	},
	// Return the point at point t.
	// From Oliver Steele's bezier.js library.
	pointAtT: function(t) {
		var c = this.coefficients();
		var cx = c.xs, cy = c.ys;
		// evaluate cx[0] + cx[1]t +cx[2]t^2 ....
		
		// optimization: start from the end, to save one
		// muliplicate per order (we never need an explicit t^n)
		
		// optimization: special-case the last element
		// to save a multiply-add
		var x = cx[cx.length - 1], y = cy[cy.length - 1];
		
		for (var i = cx.length - 1; --i >= 0; ) {
			x = x * t + cx[i];
			y = y * t + cy[i];
		}
		return new Point(x, y);
	},
	// Render the Bezier to a WHATWG 2D canvas context.
	// Based on Oliver Steele's bezier.js library.
	draw: function (ctx) {
		ctx.moveTo(this.points[0].x, this.points[0].y);
		var fn = this.drawCommands[this.order];
		if (fn) {
			var coords = [];
			for (var i = 1 == this.order ? 0 : 1; i < this.points.length; ++i) {
				coords.push(this.points[i].x);
				coords.push(this.points[i].y);
			}
			fn.apply(ctx, coords);
		}
	},
	// Wrapper functions to work around Safari, in which, up to at least 2.0.3,
	// fn.apply isn't defined on the context primitives.
	// Based on Oliver Steele's bezier.js library.
	drawCommands: [
		null,
		// This will have an effect if there's a line thickness or end cap.
		function(x, y) {
			this.lineTo(x + 0.001, y);
		},
		function(x, y) {
			this.lineTo(x, y);
		},
		function(x1, y1, x2, y2) {
			this.quadraticCurveTo(x1, y1, x2, y2);
		},
		function(x1, y1, x2, y2, x3, y3) {
			this.bezierCurveTo(x1, y1, x2, y2, x3, y3);
		}
	],
	drawAndStroke: function(ctx) {
		ctx.beginPath();
		this.draw(ctx);
		ctx.stroke();
	},
	drawAndStrokeDashed: function(ctx, dashLength) {
		ctx.beginPath();
		var markedEvery = this.markedEvery(dashLength);
		if (markedEvery.times.length % 2) markedEvery.times.push(1);
		for (var i = 1; i < markedEvery.times.length; i += 2) {
			this.mid(markedEvery.times[i - 1], markedEvery.times[i]).draw(ctx);
		}
		ctx.stroke();
	},
	drawAndStrokeDotted: function(ctx, dotSpacing) {
		ctx.beginPath();
		var oldLineCap = ctx.lineCap;
		ctx.lineCap = 'round';
		var markedEvery = this.markedEvery(dotSpacing);
		markedEvery.times.each(function(t) {
			this.pointAtT(t).draw(ctx);
		}.bind(this));
		ctx.stroke();
		ctx.lineCap = oldLineCap;
	}
}
