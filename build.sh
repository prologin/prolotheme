#!/usr/bin/env bash
#
# This script download and process
# dependencies of this theme
# See the README for more details

set -xeuo pipefail

yarn install

mkdir -p static/js/codemirror/mode/
mkdir -p static/css/codemirror/theme/

cp node_modules/codemirror/lib/codemirror.js static/js/codemirror/
cp node_modules/codemirror/mode/python/python.js \
   node_modules/codemirror/mode/xml/xml.js \
   node_modules/codemirror/mode/javascript/javascript.js \
   node_modules/codemirror/mode/css/css.js \
   node_modules/codemirror/mode/htmlmixed/htmlmixed.js \
   static/js/codemirror/mode/

cp node_modules/codemirror/theme/monokai.css static/css/codemirror/theme/
cp node_modules/codemirror/lib/codemirror.css static/css/codemirror/

cp node_modules/jquery/dist/jquery.min.js static/js/
cp node_modules/skulpt/dist/skulpt.min.js node_modules/skulpt/dist/skulpt-stdlib.js static/js/
cp node_modules/mathjax/es5/tex-svg.js static/js/
