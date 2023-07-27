(function() {
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
