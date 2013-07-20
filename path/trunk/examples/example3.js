var Rect = Path.Rect;

var ctx, shapes, translateCheckbox, scaleCheckbox, rotateCheckbox;

contentLoaded(window, function() {
  setTimeout(function() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      ctx = canvas.getContext('2d');
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';

      shapes = [
        new Rect(-125, -125, 125, 125, {
          x_fill: true,
          fillStyle: 'rgba(0, 0, 0, 0.05)',
          strokeStyle: 'rgba(0, 0, 0, 0.1)'
        }),
        new Rect(-125, -125, 125, 125, {
          x_fill: true,
          fillStyle: 'rgba(255, 255, 255, 0.7)',
          strokeStyle: 'rgba(0, 0, 0, 0.9)'
        })
      ];

      translateCheckbox = document.getElementById('translate_checkbox');
      scaleCheckbox = document.getElementById('scale_checkbox');
      rotateCheckbox = document.getElementById('rotate_checkbox');

      var fps = 30;
      var delay = 1000 / fps;
      drawFrame();
      setInterval(drawFrame, delay);
    }
  }, 0);
});

function drawFrame() {
  var now = new Date();
  var degrees = now.getTime() / 30 % 360;
  var radians = degrees / 180 * Math.PI;
  ctx.clearRect(0, 0, 400, 400);
  ctx.save();
  ctx.translate(200, 200);
  shapes[0].draw(ctx);
  if (translateCheckbox.checked) {
    var dx = 10 * Math.sin(radians * 4);
    var dy = 10 * Math.cos(radians * 4);
    ctx.translate(dx, dy);
  }
  if (scaleCheckbox.checked) {
    var scale = 1 + 0.05 * Math.cos(radians * 8);
    ctx.scale(scale, scale);
  }
  if (rotateCheckbox.checked) {
    ctx.rotate(radians);
  }
  shapes[1].draw(ctx);
  ctx.restore();
}
