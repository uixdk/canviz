/*
 * $Id$
 */

var ctx, width, height;
document.observe('dom:loaded', function() {
	var maps = $$('map');
	maps.each(function(map) {
		['click', 'mouseover', 'mouseout'].each(function(event_name) {
			map.observe(event_name, my_event_observer);
		});
	});
	var image = $('image');
	var canvas = $('canvas');
	var overlay = $('overlay');
	ctx = canvas.getContext('2d');
	image.observe('load', function() {
		width = image.clientWidth;
		height = image.clientHeight;
		[canvas, overlay].each(function(element) {
			element.width = width;
			element.height = height;
		});
		ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		ctx.strokeStyle = 'rgba(0, 0, 255, 0.8)';
		ctx.lineWidth = 3;
		$('status').update('image loaded ' + width + 'x' + height);
	});
});
var clicked_element = null;
function my_event_observer(event) {
	var element = event.element();
	ctx.clearRect(0, 0, width, height);
	switch (event.type) {
		case 'click':
			clicked_element = element;
			// fall through
		case 'mouseover':
			make_area_path(element);
			ctx.fill();
			break;
		default:
	}
	if (clicked_element) {
		make_area_path(clicked_element);
		ctx.stroke();
	}
	$('status').update(event.type + ' ' + element.id + ' ' + element.shape + ' ' + element.coords);
}
function make_area_path(area) {
	ctx.beginPath();
	switch (area.shape) {
		case 'poly':
			var points = area.coords.split(' ');
			points.each(function(point, i) {
				var coords = point.split(',');
				if (0 == i) {
					ctx.moveTo(coords[0], coords[1]);
				} else {
					ctx.lineTo(coords[0], coords[1]);
				}
			});
			break;
		case 'rect':
			var coords = area.coords.split(',');
			ctx.rect(coords[0], coords[1], coords[2] - coords[0], coords[3] - coords[1]);
			break;
		case 'circle':
			var coords = area.coords.split(',');
			ctx.arc(coords[0], coords[1], coords[2], 0, 2 * Math.PI);
			break;
		default:
	}
	ctx.closePath();
}
