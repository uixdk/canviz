# Introduction #

Canviz requires a web browser that supports the [canvas element](http://en.wikipedia.org/wiki/Canvas_(HTML_element)), or Internet Explorer for Windows.


# Browser compatibility with Canviz #

| **Browser** | **Vendor** | **Layout Engine** | **Version** | **Status** | **Notes** |
|:------------|:-----------|:------------------|:------------|:-----------|:----------|
| [Camino](http://www.caminobrowser.org/) | Mozilla    | Gecko             | 1.0b2 and up | supported  |           |
|             |            |                   | < 1.0b2     | unsupported | lacks canvas element |
| [Chrome](http://www.google.com/chrome) | Google     | WebKit            | any         | supported  |           |
| [Firefox](http://www.getfirefox/) | Mozilla    | Gecko             | 1.5 and up  | supported  |           |
|             |            |                   | < 1.5       | unsupported | lacks canvas element |
| [Internet Explorer](http://www.microsoft.com/ie/) for Windows | Microsoft  | Trident           | 8.0 beta 2  | broken     | see [issue #38](https://code.google.com/p/canviz/issues/detail?id=#38) |
|             |            |                   | 6.0 and 7.0 | supported  |           |
|             |            |                   | < 6.0       | unsupported |           |
| Internet Explorer for Mac | Microsoft  | Tasman            | any         | unsupported | lacks canvas element |
| [OmniWeb](http://www.omnigroup.com/omniweb/) | OmniGroup  | WebKit            | 5.6 and up  | supported  |           |
|             |            |                   | 5.5.x       | unsupported | canvas stops working when resized |
|             |            |                   | < 5.5       | unsupported | lacks canvas element |
| [Opera](http://www.opera.com/) | Opera      | Presto            | 9.25 and up | supported  |           |
|             |            |                   | < 9.25      | unsupported | not supported by Prototype |
|             |            |                   | < 9.0       | unsupported | lacks canvas element |
| [Safari](http://www.apple.com/safari) | Apple      | WebKit            | 3.0 and up  | supported  |           |
|             |            |                   | 2.x         | unsupported | canvas does not support scale or translate functions Canviz requires; Safari 3 is a free update |
|             |            |                   | 1.x         | unsupported | lacks canvas element |

Other browsers based on recent versions of these layout engines should be compatible as well. If you have specific information about a popular browser not listed here, please edit this page and add it.