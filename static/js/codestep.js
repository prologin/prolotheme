(function() {
    'use strict';

    function setupBlocks(codeblocks) {
        for (const cb of codeblocks) {
            var blocks = cb.querySelectorAll(".codestep-block");
            blocks[0].className = "codestep-block step-0";
            var descs = cb.querySelectorAll(".codestep-desc");
            descs[0].style.display = "block";
        }
    }

    function displayBlock(codeblock, newI) {
        var blocks = codeblock.querySelectorAll(".codestep-block");
        var descs = codeblock.querySelectorAll(".codestep-desc");
        var oldI = codeblock.dataset.step;

        blocks[oldI].className = "codestep-block codestep-block-hidden step-" + oldI;
        blocks[newI].className = "codestep-block step-" + newI;
        descs[oldI].style.display = "none";
        descs[newI].style.display = "block";

        codeblock.setAttribute("data-step", newI);

        var prev = codeblock.querySelector(".codestep-prev-button");
        var next = codeblock.querySelector(".codestep-next-button");
        if (oldI < newI) {
            prev.firstElementChild.style.display = "block";
            if (newI === parseInt(codeblock.dataset.maxStep) - 1)
                next.firstElementChild.style.display = "none";
        }
        else {
            next.firstElementChild.style.display = "block";
            if (newI === 0)
                prev.firstElementChild.style.display = "none";
        }
    }

    function setupButtons(codeblocks) {
        for (const cb of codeblocks) {
            var prev = cb.querySelector(".codestep-prev-button");
            var next = cb.querySelector(".codestep-next-button");

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

    var codesteps = document.querySelectorAll(".codestep");
    setupButtons(codesteps);
    setupBlocks(codesteps);
})();
