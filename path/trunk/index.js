// Require Path first to load the circular dependencies in the right order
var Path = module.exports = require('./src/Path.js');

Path.Bezier = require('./src/Bezier.js');
Path.Ellipse = require('./src/Ellipse.js');
Path.Point = require('./src/Point.js');
Path.Polygon = require('./src/Polygon.js');
Path.Rect = require('./src/Rect.js');
