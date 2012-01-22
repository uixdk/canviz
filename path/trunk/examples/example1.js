function newTestPaths() {
	return [
		new Path([
			new Bezier([
				new Point(150, 80),
				new Point(80, 120),
				new Point(10, 80)
			]),
			new Bezier([
				new Point(10, 80),
				new Point(60, 10)
			]),
			new Bezier([
				new Point(60, 10),
				new Point(290, 10),
				new Point(60, 200),
				new Point(390, 200)
			]),
			new Bezier([
				new Point(390, 200),
				new Point(390, 140),
				new Point(330, 140),
				new Point(300, 160)
			])
		]),
		new Ellipse(300, 80, 90, 40),
		new Rect(40, 124, 170, 170)
	];
}
var testPaths = [], spacing = 30, firstDistance = spacing, drawFirst = true, ctx, animating = false, pointerX = pointerY = 0, canvasOffset;
function startStop() {
	if (animating) {
		$('start_stop_btn').value = 'Animate';
		animating = false;
	} else {
		$('start_stop_btn').value = 'Stop';
		animating = true;
		animateFrame();
	}
}
function animateFrame() {
	++firstDistance;
	if (firstDistance > spacing) {
		firstDistance -= spacing;
		drawFirst = !drawFirst;
	}
	drawFrame();
	if (animating) setTimeout('animateFrame()', 50);
}
function drawFrame() {
	ctx.clearRect(0, 0, 400, 400);
	var output = '';
	
	ctx.lineWidth = 4;
	var halfLineWidth = ctx.lineWidth / 2;
	
	ctx.strokeStyle = 'rgb(233,233,233)';
	
	ctx.beginPath();
	testPaths.each(function(paths) {
		paths.each(function(path) {
			path.makePath(ctx);
		});
	});
	ctx.stroke();
	
	ctx.strokeStyle = 'rgb(100,100,100)';
	
	ctx.beginPath();
	var before = new Date();
	testPaths[0].each(function(path) {
		path.makeDottedPath(ctx, spacing, firstDistance);
	});
	var after = new Date();
	ctx.stroke();
	if (!animating) output += 'dotted took ' + (after.getTime() - before.getTime())/1000 + ' seconds<br/>';
	
	ctx.beginPath();
	before = new Date();
	testPaths[1].each(function(path) {
		path.makeDashedPath(ctx, spacing, firstDistance, drawFirst);
	});
	after = new Date();
	ctx.stroke();
	if (!animating) output += 'dashed took ' + (after.getTime() - before.getTime())/1000 + ' seconds<br/>';
	
	ctx.strokeStyle = 'rgba(255,0,0,0.5)';
	
	ctx.beginPath();
	testPaths.each(function(paths) {
		paths.each(function(path) {
			if (path.isPointOnPath(pointerX, pointerY, 5)) {
				path.makePath(ctx);
			}
		});
	});
	ctx.stroke();
	
	ctx.lineWidth = 1;
	
	var bb;
	
	if ($F('path_bboxes')) {
		ctx.strokeStyle = '#0c0';
		ctx.beginPath();
		testPaths.each(function(paths) {
			paths.each(function(path) {
				bb = Object.clone(path.getBB());
				bb.inset(-halfLineWidth, -halfLineWidth).makePath(ctx);
			});
		});
		ctx.stroke();
	}
	
	if ($F('segment_bboxes')) {
		ctx.strokeStyle = '#c0f';
		ctx.beginPath();
		testPaths.each(function(paths) {
			paths.each(function(path) {
				path.segments.each(function(segment) {
					bb = Object.clone(segment.getBB());
					bb.inset(-halfLineWidth, -halfLineWidth).makeDashedPath(ctx, 8);
				});
			});
		});
		ctx.stroke();
	}
	
	if ($F('segment_handles')) {
		ctx.strokeStyle = '#0cf';
		ctx.beginPath();
		testPaths.each(function(paths) {
			paths.each(function(path) {
				path.segments.each(function(segment) {
					switch (segment.order) {
						case 2:
						case 3:
							ctx.moveTo(segment.points[0].x, segment.points[0].y);
							for (var i = 1; i < segment.order; ++i) {
								ctx.lineTo(segment.points[i].x, segment.points[i].y);
							}
							break;
						case 4:
							ctx.moveTo(segment.points[0].x, segment.points[0].y);
							ctx.lineTo(segment.points[1].x, segment.points[1].y);
							ctx.moveTo(segment.points[2].x, segment.points[2].y);
							ctx.lineTo(segment.points[3].x, segment.points[3].y);
							break;
					}
				});
			});
		});
		ctx.stroke();
		ctx.lineWidth = 4;
		ctx.beginPath();
		testPaths.each(function(paths) {
			paths.each(function(path) {
				path.segments.each(function(segment) {
					segment.points.each(function(point) {
						point.makePath(ctx);
					});
				});
			});
		});
		ctx.stroke();
	}
	
	if (!animating) $('output').update(output);
}
function handleEvent(event) {
	if (event) {
		pointerX = event.pointerX() - canvasOffset.left;
		pointerY = event.pointerY() - canvasOffset.top;
		drawFrame();
	}
}
document.observe('dom:loaded', function() {
	var canvas = $('canvas');
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
		
		ctx.lineCap = 'round';
		
		testPaths[0] = newTestPaths();
		testPaths[1] = newTestPaths();
		testPaths[1].each(function(path) {
			path.offset(0, 190);
		});
		
		canvasOffset = canvas.cumulativeOffset();
		canvas.observe('mousemove', handleEvent);
		canvas.observe('mouseout', handleEvent);
		
		$('start_stop_btn').value = animating ? 'Stop' : 'Animate';
		drawFrame();
	}
});
function dump(obj) {
	var output = '';
	output += '<fieldset><legend>' + typeof(obj) + '<\/legend>';
	for (var elem in obj) {
		output += '<b>' + elem + '<\/b>: ' + ('function' == typeof(obj[elem]) ? '' : obj[elem]) + ('object' == typeof(obj[elem]) ? '' : ' [' + typeof(obj[elem]) + ']') + '<br/>';
	}
	output += '<\/fieldset>';
	$('output').innerHTML += output;
}
