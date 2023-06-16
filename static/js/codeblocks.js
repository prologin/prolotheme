"use strict";

// Found here: https://github.com/skulpt/skulpt/blob/master/HACKING.md
function builtinRead(x)
{
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

function getCodeMirrorFromTxtArea(txtAreaNode, lang) {
    return CodeMirror(
        function (elt) {
            txtAreaNode.parentNode.replaceChild(elt, txtAreaNode);
        },
        {
            value: txtAreaNode.value,
            mode: lang,
            lineNumbers: true,
            tabSize: 4,
            theme: "monokai",
        }
    );

}

// Python code blocks
(function () {

    function runCodePython(inputCodeNode, outTxtNode, canvasNode) {
        const code = inputCodeNode.getValue();

        outTxtNode.innerHTML = "";
        Sk.pre = "output";

        Sk.configure({
            // Output appends on the "codeOut" html element.
            output: function (text) {
                outTxtNode.innerHTML = outTxtNode.innerHTML + text;
            },
            read: builtinRead,
            inputfunTakesPrompt: true,
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

    function initCodePython(codeBlock) {
        console.log("initCodePython");
        const textArea = codeBlock.querySelector(".prolo-codeblock-input");
        const outTxt = codeBlock.querySelector(".prolo-codepython-output");
        const outCanvas = codeBlock.querySelector(".prolo-codepython-canvas");
        const runBtn = codeBlock.querySelector(".prolo-codeblock-run-btn");

        // Replace the text-area with a CodeMirror block,
        // which includes line numbers and syntax highlighting.
        const codeMirror = getCodeMirrorFromTxtArea(textArea, "python");

        runBtn.addEventListener(
            "click",
            function() {runCodePython(codeMirror, outTxt, outCanvas);}
        );

    }

    // Get all the Python code blocks and initialize them,
    let pythonCodeBlocks = document.querySelectorAll(".prolo-codepython");
    pythonCodeBlocks.forEach(initCodePython);
})();

// HTML code blocks
(function (){
    function runCodeHTML(inputCodeNode, outFrame) {
        var code = inputCodeNode.getValue();
        var out = outFrame.contentWindow.document;
        out.open();
        out.write("<!DOCTYPE html>"); // Added to shut up the "Quirks" warning.
        out.write(code);
        out.close();
    }

    function initCodeHTML(codeBlock) {
        console.log("initCodeBlock");
        const textArea = codeBlock.querySelector(".prolo-codeblock-input");
        const outFrame = codeBlock.querySelector(".prolo-codeblock-result");
        const runBtn = codeBlock.querySelector(".prolo-codeblock-run-btn");

        // Replace the text-area with a CodeMirror block,
        // which includes line numbers and syntax highlighting.
        const codeMirror = getCodeMirrorFromTxtArea(textArea, "htmlmixed");

        runBtn.addEventListener(
            "click",
            function() {runCodeHTML(codeMirror, outFrame);}
        );

    }

    // Get all the HTML code blocks and initialize them,
    let htmlCodeBlocks = document.querySelectorAll(".prolo-codehtml");
    htmlCodeBlocks.forEach(initCodeHTML);
})();
