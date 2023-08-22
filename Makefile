# Makefile
# This script download and process
# dependencies of this theme
# See the README for more details

CONTENT_PATH = "exampleSite/content"

deploy: CONTENT_PATH = "../../content"
deploy: given_resources dependencies

dependencies:
	yarn install
	-yarn searchjson --content=$(CONTENT_PATH)
	
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
	cp node_modules/lunr/lunr.min.js static/js/

clean_dependencies:
	rm -rf node_modules
	rm -rf static/js/codemirror
	rm -rf static/css/codemirror
	rm -rf static/js/jquery.min.js
	rm -rf static/js/skulpt.min.js
	rm -rf static/js/skulpt-stdlib.js
	rm -rf static/js/tex-svg.js
	rm -rf static/js/lunr.min.js

given_resources: SHELL := /bin/bash
given_resources:
	# This script create zip files if 
	# there is multiple given resources
	# See the README for more details
	
	############################################
	# This script is supposed to only be       #
	# runned by hugo sites that use this theme #
	############################################
	
	$(eval resources := $(shell find ${CONTENT_PATH} -type d -name given_resources))

	$(foreach i,$(resources),\
		$(eval nb_dirs := $(shell find $i/* -maxdepth 0 -type d | wc -l))\
		$(eval nb_files := $(shell find $i -maxdepth 1 | wc -l))\
		$(eval tp_name := $(shell basename "$(shell dirname "$(shell dirname "$i")")"))\
		if [[ $(shell find $i -maxdepth 1 | wc -l) -gt 1 || $(nb_dirs) -gt 0 ]] ;\
		then\
			pushd $i ;\
			zip -r "$(tp_name).zip" . ;\
			popd ;\
		fi ;\
	)


clean_resources:
	$(foreach i,$(shell find ${CONTENT_PATH} -type f -name "*.zip"),$(RM) $i)


preview: given_resources dependencies
	hugo --config exampleSite/config.toml --contentDir exampleSite/content --themesDir ../ --theme prolotheme --ignoreCache server


clean: clean_resources clean_dependencies

