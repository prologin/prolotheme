(function() {
    'use strict';

    function divide(sections, currentSection) {
        if (currentSection < 0)
            currentSection = 0;
        if (currentSection >= sections.length)
            currentSection = sections.length - 1;


        var i = 0
        for (const el of sections) {
            var check = document.querySelector(".progress-bar-state-" + i)
            var toc = document.querySelector("#toc-" + (i + 1));

            if (i == currentSection)
            {
                el.style.display = 'block';
                if (toc !== null)
                    toc.style.display = 'block';
                check.className = "progress-bar-state-" + i + " started";
            }
            else if (i > currentSection)
            {
                el.style.display = 'none';
                if (toc !== null)
                    toc.style.display = 'none';
                check.className = "progress-bar-state-" + i;
            }
            else
            {
                el.style.display = 'none';
                if (toc !== null)
                    toc.style.display = 'none';
                check.className = "progress-bar-state-" + i + " ended";
            }

            i += 1
        }

        // only display next and previous buttons when it makes sense
        var next = document.querySelector(".next-button")
        var prev = document.querySelector(".prev-button")
        var toc = document.querySelector("#toc-" + (currentSection + 1));
        if (toc === null)
            toc = document.querySelector("#toc");

        if (currentSection == 0)
            prev.style.display = 'none';
        else
            prev.style.display = 'block';

        if (currentSection == sections.length - 1)
            next.style.display = 'none';
        else
            next.style.display = 'block';

        if (toc !== null) {
            prev.style.setProperty("--arrow-position", "32%");
            next.style.setProperty("--arrow-position", "60%");
        }
        else {
            prev.style.setProperty("--arrow-position", "50%");
            next.style.setProperty("--arrow-position", "50%");
        }

        localStorage.setItem('index', JSON.stringify(currentSection));
    }

    function addState(sections) {
        var list = document.querySelector(".progress-bar")
        let i = 0
        for (; i < sections.length; i++) {
            var state = document.createElement("div");
            state.className = "progress-bar-state-" + i;
            list.appendChild(state)
        }
    }

    function switchBtn(sections) {
        var next = document.querySelector(".next-button")
        next.addEventListener('click', 
            function() {
                window.scrollTo({ top: 0, behavior: 'smooth'});
                divide(sections, JSON.parse(localStorage.getItem('index')) + 1);
            });
        var prev = document.querySelector(".prev-button")
        prev.addEventListener('click', 
            function() {
                window.scrollTo({ top: 0, behavior: 'smooth'});
                divide(sections, JSON.parse(localStorage.getItem('index')) - 1);
            });
    }

    function linkToc(sections, links) {
        for (const l of links) {
            l.addEventListener('click', function() { divide(sections, l.dataset.section) });
        }
    }

    // display TPs in sections
    if (localStorage.getItem("index") === null)
        localStorage.setItem('index', JSON.stringify(0))

    var sectionBlock = document.querySelectorAll('[id^=section]');
    var sectionLinks = document.querySelectorAll('.section-link');

    addState(sectionBlock)
    divide(sectionBlock, 0)
    switchBtn(sectionBlock)
    linkToc(sectionBlock, sectionLinks);
})();
