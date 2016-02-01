# Introduction #

Canviz began as a proof of concept—is it possible to draw Graphviz graphs to a browser canvas? I thought a good place to start would be to try to write an example that could render all the sample graphs included with Graphviz. As of October 2008, Canviz can do this. You can see it in action on the [demo page](http://www.ryandesign.com/canviz/). This wiki page explains how to get this example working on your system.


# Requirements #

The example requires:

  * a [supported web browser](Browsers.md)
  * Graphviz


# Setup #

  * [Download](http://code.google.com/p/canviz/downloads/list) and extract the latest release of Canviz.
  * Open index.html in a web browser.


# Alternate Setup #

If you'd rather build from source:

  * [Check out](http://code.google.com/p/canviz/source/checkout) the Canviz trunk. You'll need Subversion 1.5 or greater.
  * Run `make examples` in the source directory. Besides Graphviz, this requires standard UNIX utilities like make, bash, awk, dirname, find and which, so you need a UNIX-like operating system, or Cygwin on Windows.
  * Open index.html in a web browser.