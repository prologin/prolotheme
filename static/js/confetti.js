(function() {
    "use strict";

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function throwConfettis()
    {
        var confetti = document.querySelectorAll(".confetti");

        for (var i = 0; i < confetti.length; i++) {
            confetti[i].style.backgroundColor = `rgb(${getRandomInt(255)},
                                                     ${getRandomInt(255)},
                                                     ${getRandomInt(255)})`;

            var position = getRandomInt(100);
            var anim = [
                {
                    transform: "translate3d(0, 0, 0) rotate(0)",
                    left: `${position}%`,
                    opacity: "1"
                },
                {
                    transform: `translate3d(${getRandomInt(500) - 250}px,
                                            ${-getRandomInt(200) - 100}px,
                                            0)
                                rotate(${getRandomInt(360)}deg)`,
                    left: `${position}%`,
                    opacity: "0"
                }
            ]

            var timing = {
                duration: 500 + getRandomInt(500),
                iterations: 1
            }

            confetti[i].animate(anim, timing);
        }
    }

    var scrollTop = 0;
    window.addEventListener('scroll', function(event) {
        var goBackButton = document.querySelector('#go-back-button');

        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st < scrollTop) {
            scrollTop = st <= 0 ? 0 : st;
            return;
        }

        scrollTop = st <= 0 ? 0 : st;

        var display = window.getComputedStyle(goBackButton, null).display;
        if (display === "none")
            return;

        var position = goBackButton.getBoundingClientRect();

        if (position.top >= 0 && position.bottom <= window.innerHeight)
            throwConfettis();
    });
})();
