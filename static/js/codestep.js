(function() {
    'use strict';

    function displayBlock(codeblock, newI) {
        var blocks = codeblock.querySelectorAll(".codestep-block");
        var descs = codeblock.querySelectorAll(".codestep-desc");
        var oldI = parseInt(codeblock.dataset.step);

        var maxStep = parseInt(codeblock.dataset.maxStep);

        if (newI === maxStep || newI === -1) {
            for (let i = 0; i < maxStep; i++) {
                blocks[i].className = "codestep-block step-" + i;
            }
            descs[maxStep - 1].style.display = "none";
        }
        else if (oldI === maxStep || oldI === -1) {
            for (let i = 0; i < maxStep; i++) {
                blocks[i].className = "codestep-block codestep-block-hidden step-" + i;
            }
            blocks[newI].className = "codestep-block step-" + newI;
            descs[newI].style.display = "block";
        }
        else {
            blocks[oldI].className = "codestep-block codestep-block-hidden step-" + oldI;
            blocks[newI].className = "codestep-block step-" + newI;
            descs[oldI].style.display = "none";
            descs[newI].style.display = "block";
        }

        codeblock.setAttribute("data-step", newI);

        var prev = codeblock.querySelector(".codestep-prev-button");
        var next = codeblock.querySelector(".codestep-next-button");
        if (oldI < newI) {
            prev.firstElementChild.style.display = "block";
            if (newI === maxStep)
                next.firstElementChild.style.display = "none";
        }
        else {
            next.firstElementChild.style.display = "block";
            if (newI === -1)
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
})();
