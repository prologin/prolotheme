(function () {
    "use strict";

    function addSpoiler(spoilerNode) {
        spoilerNode.addEventListener(
            "click",
            function () {
                // When a spoiler is clicked, reveal it
                spoilerNode.classList.remove("prolo-spoiler-hidden");
                let txt = spoilerNode.querySelector(".prolo-spoiler-content");
                txt.classList.remove("prolo-spoiler-content-hidden");
            },
            { once: true } // Can only un-hide spoilers once
        );
    }

    // Add a listener to all the spoiler blocks
    var spoilers = document.querySelectorAll(".prolo-spoiler");
    Array.prototype.forEach.call(spoilers, addSpoiler);
}());
