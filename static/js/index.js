(function() {
  'use strict';

  function flashCopyMessage(el, msg) {
    el.textContent = msg;
    setTimeout(function() {
      el.textContent = "Copier";
    }, 1000);
  }

  function selectText(node) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    return selection;
  }

  function addCopyButton(containerEl) {
    var copyBtn = document.createElement("button");
    copyBtn.className = "copy-button";
    copyBtn.textContent = "Copier";

    var codeEl = containerEl.querySelector("[class^='language-']");
    copyBtn.addEventListener('click', function() {
      var selection = selectText(codeEl);
      navigator.clipboard.writeText(selectText(codeEl)).then(
        function(){
          selection.removeAllRanges();
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
  var highlightBlocks = document.querySelectorAll('.code:not(.text)');

  Array.prototype.forEach.call(highlightBlocks, addCopyButton);


  // display TPs in sections
  if (localStorage.getItem("index") === null)
    localStorage.setItem('index', JSON.stringify(0))

  function divide(sections, avancement) {
    location.href = '#top'
    if (avancement < 0)
      avancement = 0;
    if (avancement >= sections.length)
      avancement = sections.length - 1;

    var i = 0
    for (const el of sections) {
      var check = document.querySelector(".footer-state-" + i)

      if (i == avancement)
      {
        el.style.display = 'block';
        check.className = "footer-state-" + i + " started";
      }
      else if (i > avancement)
      {
        el.style.display = 'none';
        check.className = "footer-state-" + i;
      }
      else
      {
        el.style.display = 'none';
        check.className = "footer-state-" + i + " ended";
      }
      
      // only display next and previous buttons when it makes sense
      var next = document.querySelector(".next-button")
      var prev = document.querySelector(".prev-button")
      if (avancement == 0)
        prev.style.display = 'none';
      else
        prev.style.display = 'block';

      if (avancement == sections.length - 1)
        next.style.display = 'none';
      else
        next.style.display = 'block';

      i += 1
    }

    localStorage.setItem('index', JSON.stringify(avancement));
  }

  function addState(sections) {
    var list = document.querySelector(".footer-list")
    let i = 0
    for (; i < sections.length; i++) {
      var state = document.createElement("div");
      state.className = "footer-state-" + i;
      list.appendChild(state)
    }
  }

  function switchBtn(sections) {
    var next = document.querySelector(".next-button")
    next.addEventListener('click', function() { divide(sections, JSON.parse(localStorage.getItem('index')) + 1) });
    var prev = document.querySelector(".prev-button")
    prev.addEventListener('click', function() { divide(sections, JSON.parse(localStorage.getItem('index')) - 1) });
  }

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

  var sectionBlock = document.querySelectorAll('[id^=section]');
  var article = document.querySelector("#article-container");
  var images = article.getElementsByTagName('img');
  setupImageZoom(images);

  addState(sectionBlock)
  divide(sectionBlock, 0)
  switchBtn(sectionBlock)
  //switchArrow(sectionBlock)
})();
