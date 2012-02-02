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
var testPaths = [], spacing = 30, firstDistance = spacing, drawFirst = true, ctx, animating = false, pointer = {x: 0, y: 0}, canvasOffset;
function startStop() {
	if (animating) {
		document.getElementById('start_stop_btn').value = 'Animate';
		animating = false;
	} else {
		document.getElementById('start_stop_btn').value = 'Stop';
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
	if (animating) setTimeout(animateFrame, 50);
}
function drawFrame() {
	ctx.clearRect(0, 0, 400, 400);
	
	ctx.lineWidth = 4;
	var halfLineWidth = ctx.lineWidth / 2;
	
	ctx.strokeStyle = 'rgb(233,233,233)';
	
	ctx.beginPath();
	for (var i = 0, testPathsLength = testPaths.length; i < testPathsLength; ++i) {
		for (var j = 0, paths = testPaths[i], pathsLength = paths.length; j < pathsLength; ++j) {
			paths[j].makePath(ctx);
		}
	}
	ctx.stroke();
	
	ctx.strokeStyle = 'rgb(100,100,100)';
	
	ctx.beginPath();
	var before = new Date();
	for (var i = 0, paths = testPaths[0], pathsLength = paths.length; i < pathsLength; ++i) {
		paths[i].makeDottedPath(ctx, spacing, firstDistance);
	}
	var after = new Date();
	ctx.stroke();
	
	ctx.beginPath();
	before = new Date();
	for (var i = 0, paths = testPaths[1], pathsLength = paths.length; i < pathsLength; ++i) {
		paths[i].makeDashedPath(ctx, spacing, firstDistance, drawFirst);
	}
	after = new Date();
	ctx.stroke();
	
	ctx.strokeStyle = 'rgba(255,0,0,0.5)';
	
	ctx.beginPath();
	for (var i = 0, testPathsLength = testPaths.length; i < testPathsLength; ++i) {
		for (var j = 0, paths = testPaths[i], pathsLength = paths.length; j < pathsLength; ++j) {
			var path = paths[j];
			if (path.isPointOnPath(pointer.x, pointer.y, 5)) {
				path.makePath(ctx);
			}
		}
	}
	ctx.stroke();
	
	ctx.lineWidth = 1;
	
	var bb;
	
	if (document.getElementById('path_bboxes').checked) {
		ctx.strokeStyle = '#0c0';
		ctx.beginPath();
		for (var i = 0, testPathsLength = testPaths.length; i < testPathsLength; ++i) {
			for (var j = 0, paths = testPaths[i], pathsLength = paths.length; j < pathsLength; ++j) {
				bb = Object.clone(paths[j].getBB());
				bb.inset(-halfLineWidth, -halfLineWidth).makePath(ctx);
			}
		}
		ctx.stroke();
	}
	
	if (document.getElementById('segment_bboxes').checked) {
		ctx.strokeStyle = '#c0f';
		ctx.beginPath();
		for (var i = 0, testPathsLength = testPaths.length; i < testPathsLength; ++i) {
			for (var j = 0, paths = testPaths[i], pathsLength = paths.length; j < pathsLength; ++j) {
				for (var k = 0, segments = paths[j].segments, segmentsLength = segments.length; k < segmentsLength; ++k) {
					bb = Object.clone(segments[k].getBB());
					bb.inset(-halfLineWidth, -halfLineWidth).makeDashedPath(ctx, 8);
				}
			}
		}
		ctx.stroke();
	}
	
	if (document.getElementById('segment_handles').checked) {
		ctx.strokeStyle = '#0cf';
		ctx.beginPath();
		for (var i = 0, testPathsLength = testPaths.length; i < testPathsLength; ++i) {
			for (var j = 0, paths = testPaths[i], pathsLength = paths.length; j < pathsLength; ++j) {
				for (var k = 0, segments = paths[j].segments, segmentsLength = segments.length; k < segmentsLength; ++k) {
					var segment = segments[k];
					var points = segment.points;
					var order = segment.order
					switch (order) {
						case 2:
						case 3:
							ctx.moveTo(points[0].x, points[0].y);
							for (var l = 1; l < order; ++l) {
								ctx.lineTo(points[l].x, points[l].y);
							}
							break;
						case 4:
							ctx.moveTo(points[0].x, points[0].y);
							ctx.lineTo(points[1].x, points[1].y);
							ctx.moveTo(points[2].x, points[2].y);
							ctx.lineTo(points[3].x, points[3].y);
							break;
					}
				}
			}
		}
		ctx.stroke();
		ctx.lineWidth = 4;
		ctx.beginPath();
		for (var i = 0, testPathsLength = testPaths.length; i < testPathsLength; ++i) {
			for (var j = 0, paths = testPaths[i], pathsLength = paths.length; j < pathsLength; ++j) {
				for (var k = 0, segments = paths[j], segmentsLength = segments.length; k < segmentsLength; ++k) {
					for (var l = 0, points = segments[k].points, pointsLength = points.length; l < pointsLength; ++l) {
						points[l].makePath(ctx);
					}
				}
			}
		}
		ctx.stroke();
	}
}
function pointerPosition(event) {
	var docElement = document.documentElement;
	var body = document.body || {scrollLeft: 0, scrollTop: 0};
	
	var x = event.pageX || (event.clientX +
		(docElement.scrollLeft || body.scrollLeft) -
		(docElement.clientLeft || 0));
	
	var y = event.pageY || (event.clientY +
		(docElement.scrollTop || body.scrollTop) -
		(docElement.clientTop || 0));
	
	return {x: x, y: y};
}
function handleEvent(event) {
	if (event) {
		pointer = pointerPosition(event);
		pointer.x -= canvasOffset.left;
		pointer.y -= canvasOffset.top;
		drawFrame();
	}
}

contentLoaded(window, function() {
  setTimeout(function() {

	var canvas = document.getElementById('canvas');
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
		
		ctx.lineCap = 'round';
		
		testPaths[0] = newTestPaths();
		testPaths[1] = newTestPaths();
		for (var i = 0, paths = testPaths[1], pathsLength = paths.length; i < pathsLength; ++i) {
			paths[i].offset(0, 190);
		}
		
		canvasOffset = canvas.cumulativeOffset();
		canvas.observe('mousemove', handleEvent);
		canvas.observe('mouseout', handleEvent);
		
		document.getElementById('start_stop_btn').value = animating ? 'Stop' : 'Animate';
		drawFrame();
		
		document.getElementById('start_stop_btn').onclick = startStop;
		document.getElementById('step_btn').onclick = animateFrame;
		var checkboxes = ['path_bboxes', 'segment_bboxes', 'segment_handles'];
		for (var i = 0, checkboxesLength = checkboxes.length; i < checkboxesLength; ++i) {
			document.getElementById(checkboxes[i]).onclick = drawFrame;
		}
	}
  }, 0);
});
