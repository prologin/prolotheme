// Run block
// Found here: https://github.com/skulpt/skulpt/blob/master/HACKING.md
function builtinRead(x)
{
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

function findAncestor (el, sel) {
    while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el,sel)));
    return el;
}

function getText(codestep) {
    var blocks = codestep.querySelectorAll(".codestep-block");
    var code = ""
    for (const b of blocks) {
        var text = b.querySelector(".language-py").innerText;
        code += text + "\n";
    }

    return code;
}

function runCodestep(runButton) {
    var cb = findAncestor(runButton, ".codestep");
    console.log(cb);

    var outTxtNode = cb.querySelector(".prolo-codepython-output");
    var canvasNode = cb.querySelector(".prolo-codepython-canvas");

    var code = getText(cb);

    outTxtNode.innerHTML = "";
    Sk.pre = "output";

    Sk.configure({
        // Output appends on the "codeOut" html element.
        output: function (text) {
            outTxtNode.innerHTML = outTxtNode.innerHTML + text;
        },
        read: builtinRead,
        inputfunTakesPrompt: true,
        execLimit: 10000,
        killableWhile: true,
        killableFor: true,
    });

    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = canvasNode;
    var myPromise = Sk.misceval.asyncToPromise(function () {
        return Sk.importMainWithBody("<stdin>", false, code, true);
    });
    myPromise.then(
        function (mod) {
            console.log("success");
        },
        function (err) {
            console.log("failed");
            outTxtNode.innerText = err.toString();
        }
    );
}

// Step by step behaviour
(function() {
    'use strict';

    var lineNb = 0;

    function resizeNumbers(numberEl) {
        var digitNb = lineNb.toString().length;
        numberEl.style.display = "block";
        numberEl.style.width = `${digitNb}em`;
        numberEl.style.paddingLeft = "0.2em";

        var spans = numberEl.querySelectorAll("span");
        for (const span of spans) {
            span.style.marginRight = 0;
            span.style.float = "right";
        }
    }

    function setupBlocks(codeblocks) {
        for (const cb of codeblocks) {
            var blocks = cb.querySelectorAll(".codestep-block");
            blocks[0].className = "codestep-block step-0";

            lineNb = cb.querySelectorAll("span[style=\"display:flex;\"]").length;
            var numbers = [...blocks].map(function(e) {
                return e.querySelector("td").querySelector("code");
            });
            numbers.forEach(resizeNumbers);

            var runButton = cb.querySelector(".prolo-codeblock-run-btn");
            var outTxt = cb.querySelector(".prolo-codepython-output");
            var outCanvas = cb.querySelector(".prolo-codepython-canvas");

            runButton.addEventListener(
                "click",
                function(event) {runCodestep(event.target);}
            );

            var result = cb.querySelector(".codestep-result");
            runButton.style.display = "none";
            result.style.display = "none";
        }
    }

    function displayBlock(codeblock, newI) {
        var blocks = codeblock.querySelectorAll(".codestep-block");
        var descs = codeblock.querySelectorAll(".codestep-desc");
        var oldI = parseInt(codeblock.dataset.step);
        var runButton = codeblock.querySelector(".prolo-codeblock-run-btn");
        var result = codeblock.querySelector(".codestep-result");

        var maxStep = parseInt(codeblock.dataset.maxStep);

        if (newI === maxStep || newI === -1) {
            for (let i = 0; i < maxStep; i++) {
                blocks[i].className = "codestep-block step-" + i;
            }
            descs[oldI].style.display = "none";
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

        if (newI === maxStep && codeblock.dataset.runnable === "true") {
            runButton.style.display = "block";
            result.style.display = "block";
        }
        else {
            runButton.style.display = "none";
            result.style.display = "none";
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
