(function() {
var ctx, shapes;

	var canvas = document.getElementById('canvas');
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
		ctx.lineWidth = 4;
		
		shapes = [
			new Rect(-100, -100, 100, 100),
			new Ellipse(0, 0, 100, 100, {
				x_fill: true,
				fillStyle: 'rgba(0, 255, 0, 0.4)',
				x_stroke: false
			}),
			new Polygon([
				new Point(-100, 100),
				new Point(0, 100 - 100 * Math.sqrt(3)),
				new Point(100, 100)
			], {
				x_fill: true,
				fillStyle: 'rgba(0, 0, 255, 0.4)',
				strokeStyle: 'rgba(0, 0, 255, 0.8)',
				lineCap: 'round'
			})
		];
		shapes[0].setOptions({
			strokeStyle: 'rgba(255, 0, 0, 0.8)',
			x_strokeType: 'dashed',
			x_dashLength: 20
		});
		
		drawFrame();
	}

function drawFrame() {
	ctx.clearRect(0, 0, 800, 400);
	ctx.save();
	ctx.translate(150, 150);
	shapes.each(function(shape) {
		shape.draw(ctx);
		ctx.translate(250, 0);
	});
	ctx.restore();
}
}());
