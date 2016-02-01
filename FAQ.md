# Frequently-asked questions #

Canviz is still new, so not many questions have been asked yet. If you have a question not answered here, please ask on the [Canviz discussion group](http://groups.google.com/group/canviz).




## Getting the source code ##

### Error parsing svn:externals property ###

Q. When [checking out the source code from the repository](http://code.google.com/p/canviz/source/checkout), I see an error message like this:

<pre>
svn: Error parsing svn:externals property on 'canviz-read-only': '-r 195 ^/path/trunk/libs path'</pre>

The path, prototype and excanvas directories are missing from the checkout, so Canviz doesn't work.

A. The Canviz repository uses [a new format for svn:externals properties](http://subversion.tigris.org/svn_1.5_releasenotes.html#externals) which made its appearance in Subversion 1.5.0; earlier versions don't know how to interpret that format and display that error message. You need a newer Subversion client to check out the Canviz sources.