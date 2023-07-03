(function() {
    'use strict';

    // Copy buttons function
    function flashCopyMessage(el, msg) {
        el.textContent = msg;
        setTimeout(function() {
            el.textContent = "Copier";
        }, 1000);
    }

    function addCopyButton(containerEl) {
        var copyBtn = document.createElement("button");
        copyBtn.className = "copy-button";
        copyBtn.textContent = "Copier";

        var codeEl = containerEl.querySelector("[class^='language-']");
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(codeEl.textContent).then(
                function(){
                    flashCopyMessage(copyBtn, 'Copié !')
                })
                .catch(
                    function() {
                        console && console.log(e);
                        flashCopyMessage(copyBtn, 'Raté :\'(')
                    });
        });

        containerEl.appendChild(copyBtn);
    }

    // Add copy button to code blocks
    var highlightBlocks = document.querySelectorAll('.copy-codeblock');

    Array.prototype.forEach.call(highlightBlocks, addCopyButton);


    function setupImageZoom(images) {
        var zoomBox = document.querySelector("#imgzoom");

        for (let i of images) {
            i.onclick = () => {
                let clone = i.cloneNode();
                clone.className = "";
                zoomBox.innerHTML = "";
                zoomBox.appendChild(clone);
                zoomBox.className = "show";
            };
        }

        zoomBox.onclick = () => { zoomBox.className = ""; };
    }

    var article = document.querySelector("#article-container");
    var images = article.getElementsByTagName('img');
    setupImageZoom(images);
})();
