---
permalink: /script
---

import Swup from 'https://unpkg.com/swup@4?module';
import SwupScrollPlugin from 'https://unpkg.com/@swup/scroll-plugin@3?module';
import SwupPreloadPlugin from 'https://unpkg.com/@swup/preload-plugin@3?module';

const swup = new Swup({
  containers: ["main"],
  plugins: [new SwupPreloadPlugin({ preloadVisibleLinks: true }), // will put the first page into the cache automatically
  new SwupScrollPlugin({
    animateScroll: false,
    shouldResetScrollPosition: (link) => !link.matches('.backlink')
  })]

});



// Flag to indicate if MathJax has been loaded
let mathJaxLoaded = false;

// Function to initialize MathJax
function initMathJax() {
  if (!mathJaxLoaded && document.body.innerText.match(/\\\(|\\\[/)) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    document.head.appendChild(script);
    mathJaxLoaded = true;

        // Apply MathJax options
        window.MathJax = {
          options: {
            enableMenu: false // Disable the context menu
          }
        };

  } else if (window.MathJax) {
    MathJax.typeset(); // Re-render math on subsequent transitions
  }
}

// Function to initialize on initial page load
function init() {
  initMathJax();
}

// Call init() on initial page load
init();

// Call init() on each page transition
swup.hooks.on('page:view', init);