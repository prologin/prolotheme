(function() {
    'use strict';

    function displayResults (results, data) {
        const searchResults = document.getElementById('results')
        if (results.length !== 0) {
            let resultList = ''
            // Iterate and build result list elements
            for (const n in results) {
                const item = results[n][0];
                var liContent = '<h2><a href="' + item.href + '">' + item.title + '</a></h2>';
                var liTag = '<li class="article-item">';

                if (item.tags !== undefined) {
                    liTag = '<li class="article-item article-tagged-item">';
                    liContent += '<ul class="tag-list">';
                    for (const tag in item.tags) {
                        var tagname = item.tags[tag];
                        var tagclass = tagname.toLowerCase().replace(/[^a-z0-9_]+/gi, '').replace(' ', '')
                        liContent += '<li class="tag-item ' + tagclass + '"><a href="/tags/' +
                            tagclass +'">' + tagname + '</a></li>';
                    }
                    liContent += '</ul>'
                }

                resultList += liTag + liContent + '</li>'
            }
            searchResults.innerHTML = resultList
        } else {
            searchResults.innerHTML = 'Aucun résultat trouvé.'
        }
    }

    // Get the query parameter(s)
    const params = new URLSearchParams(window.location.search)
    const query = params.get('query')

    // Perform a search if there is a query
    if (query) {
        // Retain the search input in the form when displaying results
        document.getElementById('search-input').setAttribute('value', query)
        var results = [];
        var pagesData;

        $.getJSON("/js/lunr/PagesIndex.json").done((data) => {
            pagesData = data;

            const idx = lunr(function() {
                this.field("title", {
                    boost: 10
                });
                this.field("tags", {
                    boost: 5
                });
                this.field("content");

                this.ref("href");

                for (const page in pagesData) {
                    if (data[page] !== null)
                        this.add(data[page]);
                }
            });

            results = idx.search(query).map(function (result) {
                return pagesData.filter(function (page) {
                    if (page !== null)
                        return page.href === result.ref;
                })
            });
            displayResults(results, pagesData);
            setupColors();
        });
    }
})();
