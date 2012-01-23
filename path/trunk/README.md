Path
====

Introduction
------------

Path is a library for drawing hollow or filled paths to a web browser canvas. It
provides methods for dealing with Bezier curves, ellipses and points. Paths can
be drawn using dashed, dotted or solid lines. This library was created for use
by the [Canviz library][1], but can be used on its own.

Path does not require the use of any external libraries, but does require the
HTML5 canvas element. Most modern browsers, including Internet Explorer 9, do.
To support IE 8 and earlier, you can use a compatibility library like
[ExplorerCanvas][2] (which uses IE's built-in [VML][3] capabilities) or
[FlashCanvas][4] (which requires the [Adobe Flash Player plugin][5]).

License
-------

Path is provided under the terms of the [MIT license](LICENSE.md).

Portions of this software were taken from or based on code from [Oliver Steele's
path.js and bezier.js libraries][6], which are also under the MIT license.

Dashed and dotted line drawing was implemented based on the algorithms described
by Jeremy Gibbons in his 1995 paper [Dotted and Dashed Lines in Metafont][7].

A version of the ExplorerCanvas library is included to demonstrate how to add
support for Internet Explorer 8 and earlier. ExplorerCanvas is distrubuted under
the terms of the [Apache License version 2.0][8].


[1]: http://canviz.org/ "Canviz"
[2]: http://code.google.com/p/explorercanvas/ "ExplorerCanvas"
[3]: http://en.wikipedia.org/wiki/Vector_Markup_Language "VML"
[4]: http://flashcanvas.net/ "FlashCanvas"
[5]: http://www.adobe.com/products/flashplayer.html "Adobe Flash Player"
[6]: http://osteele.com/archives/2006/02/javascript-beziers "JavaScript Beziers"
[7]: http://www.cs.ox.ac.uk/jeremy.gibbons/publications/#dashed "Dotted and Dashed Lines in Metafont"
[8]: http://www.apache.org/licenses/LICENSE-2.0 "Apache License version 2.0"
