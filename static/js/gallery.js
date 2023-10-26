// Step by step behaviour
(function() {
    'use strict';

    function setupBlocks(galleries) {
        for (const g of galleries) {
            var descs = g.querySelectorAll(".gallery-desc");
            for (var i = 0; i < descs.length; i++) {
                descs[i].style.display = "none";
                if (g.dataset.animate === "true") {
                    var imgs = g.querySelector(".gallery-img-container");
                    imgs.style.transition = "margin-left 1s ease";
                }
            }
            descs[0].style.display = "block";
        }
    }

    function displayBlock(gallery, newI) {
        var container = gallery.querySelector(".gallery-img-container");
        var descs = gallery.querySelectorAll(".gallery-desc");
        var oldI = parseInt(gallery.dataset.step);

        var maxStep = parseInt(gallery.dataset.maxStep);

        descs[oldI].style.display = "none";
        descs[newI].style.display = "block";

        container.style.marginLeft = `-${newI * container.offsetWidth}px`;

        gallery.setAttribute("data-step", newI);

        var prev = gallery.querySelector(".gallery-prev-button");
        var next = gallery.querySelector(".gallery-next-button");
        if (oldI < newI) {
            prev.firstElementChild.style.display = "block";
            if (newI === maxStep - 1)
                next.firstElementChild.style.display = "none";
        }
        else {
            next.firstElementChild.style.display = "block";
            if (newI === 0)
                prev.firstElementChild.style.display = "none";
        }
    }

    function setupButtons(galleries) {
        for (const cb of galleries) {
            var prev = cb.querySelector(".gallery-prev-button");
            var next = cb.querySelector(".gallery-next-button");

            prev.addEventListener('click', () => {
                var step = parseInt(cb.dataset.step);
                displayBlock(cb, step - 1);
            });
            next.addEventListener('click', () => {
                var step = parseInt(cb.dataset.step);
                displayBlock(cb, step + 1);
            });

            prev.firstElementChild.style.display = "none";
        }
    }

    var galleries = document.querySelectorAll(".gallery");
    setupButtons(galleries);
    setupBlocks(galleries);
})();
