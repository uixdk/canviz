0.2.0 / 2013-??-??
==================

* Remove PrototypeJS requirement
* Provide a single global Path variable; other classes can be accessed as Path.Bezier, Path.Ellipse, Path.Point, Path.Polygon, Path.Rect
* Classes can now be instantiated with or without `new`
* Separate each class into its own NodeJS-style module in its own source file
* Use npm for dependencies
* Use Jake build system
* Build a standalone path.js like before using Browserify
* Build a minified path.min.js using UglifyJS
* Rework examples
* Update included excanvas to version 0003

0.1 / 2011-12-10
================

* Provides classes Bezier, Ellipse, Path, Point, Polygon, Rect
* Draws dashed, dotted or solid paths, hollow or filled
* Requires PrototypeJS; includes version 1.6.0.3
* Includes excanvas version 0001 in examples

r260 / 2009-05-19
=================

* Added Polygon class

r158 / 2008-10-27
=================

* Added Rect class

r61 / 2007-03-14
================

* Added Ellipse class

r50 / 2007-03-12
================

* Renamed dashed-beziers to path

r46 / 2007-03-11
================

* Added Path class

r45 / 2007-03-11
================

* Committed initial version of dashed-beziers with Bezier and Point classes
