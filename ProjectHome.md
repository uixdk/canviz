Canviz is a JavaScript library for drawing [Graphviz](http://www.graphviz.org/) graphs to a web browser canvas. More technically, Canviz is a JavaScript xdot renderer. It works in [most modern browsers](Browsers.md).

Using Canviz has advantages for your web application over generating and sending bitmapped images and imagemaps to the browser:

  * The server only needs to have Graphviz generate xdot text; this is faster than generating bitmapped images.
  * Only the xdot text needs to be transferred to the browser; this is smaller than binary image data, and, if the browser supports it (which most do), the text can be gzip- or bzip2-compressed.
  * The web browser performs the drawing, not the server; this reduces server load.
  * The user can resize the graph without needing to involve the server; this is faster than having the server draw and send the graph in a different size.

There is the potential to offer other features:

  * Mouse-over and mouse-out events to allow changing attributes (color, size, etc.) of portions of the graph
  * Animations between graph states (see [issue #26](https://code.google.com/p/canviz/issues/detail?id=#26))
  * A draggable interface like Google Maps for exploring large graphs (see [issue #22](https://code.google.com/p/canviz/issues/detail?id=#22))

Please join me in the [Canviz discussion group](http://groups.google.com/group/canviz) if you'd like to use or help develop Canviz. Canviz can draw all the sample graphs provided with Graphviz and even supports other features not represented there, but Canviz is not finished yet and is still undergoing changes, sometimes drastic ones. I welcome you to use Canviz in your projects, but recommend that you also subscribe to the [Canviz changes](http://groups.google.com/group/canviz-changes) and [Canviz issues](http://groups.google.com/group/canviz-issues) groups so you can learn about changes to Canviz that might affect how you use it.