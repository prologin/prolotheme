/*
    Build json index used for search bar
    Triggered at build-time by yarn (command in makefile)
*/

var yaml = require("yamljs");
var S = require("string");

module.exports = function(grunt) {
    var CONTENT_PATH_PREFIX = grunt.option("content");

    grunt.registerTask("lunr-index", function() {

        grunt.log.writeln("Build pages index");

        var indexPages = function() {
            var pagesIndex = [];
            grunt.file.recurse(CONTENT_PATH_PREFIX, function(abspath, rootdir, subdir, filename) {
                if (!abspath.includes("draft")) {
                    var file = processFile(abspath, filename);
                    if (file !== undefined) {
                        var duplicatePages = pagesIndex.filter((page) => {
                            return page.href === file.href;
                        });

                        if (duplicatePages.length > 0)
                            duplicatePages[0].content += file.content;
                        else
                            pagesIndex.push(file);
                    }
                }
            });

            return pagesIndex;
        };

        var processFile = function(abspath, filename) {
            var pageIndex;

            if (S(filename).endsWith(".md") &&
                (filename === "index.md" || S(filename).startsWith("section"))) {
                grunt.log.writeln("Parse file:", abspath);
                pageIndex = processMDFile(abspath, filename);
            }

            return pageIndex;
        };

        var processMDFile = function(abspath, filename) {
            var content = grunt.file.read(abspath);
            var pageIndex;
            // First separate the Front Matter from the content and parse it
            content = content.split("---");
            var frontMatter;
            try {
                frontMatter = yaml.parse(content[1].trim());
            } catch (e) {
                console.error(e.message);
            }

            href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(filename).s;

            // Build Lunr index for this page
            pageIndex = {
                title: frontMatter.title,
                tags: frontMatter.tags,
                href: href,
                content: S(content[2]).trim().stripTags().stripPunctuation().s
            };

            return pageIndex;
        };

        grunt.file.write("static/js/lunr/PagesIndex.json", JSON.stringify(indexPages()));
        grunt.log.ok("Index built");
    });
};
