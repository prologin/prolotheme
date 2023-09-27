(function() {
    'use strict';

    function setText(overviewElt) {
        var page = $.get(overviewElt.href, null, 
            function(text) {
                overviewElt.lastElementChild.innerHTML = $(text).find(".article-summary")[0].outerHTML;
            }
        );
    }

    var overviewItems = document.querySelectorAll('.overview-item');
    Array.prototype.forEach.call(overviewItems, setText);
})();

