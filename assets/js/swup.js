---
permalink: /script
---

import Swup from 'https://unpkg.com/swup@4?module';
import FragmentPlugin from 'https://www.unpkg.com/@swup/fragment-plugin@1?module';
import SwupScrollPlugin from 'https://unpkg.com/@swup/scroll-plugin@3?module';
import SwupPreloadPlugin from 'https://unpkg.com/@swup/preload-plugin@3?module';

const swup = new Swup({
  containers: ["main"],
  plugins: [new SwupPreloadPlugin({ preloadVisibleLinks: true }),
    new FragmentPlugin(),
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

    // Function to initialize Mermaid
    function initMermaid() {
      if (document.querySelector('.language-mermaid')) {
        // Load the Mermaid library dynamically
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js';
        document.head.appendChild(script);
        
        // Initialize Mermaid after the library is loaded
        script.onload = function() {
          document.querySelectorAll('pre code.language-mermaid').forEach((code) => {
            // Create a <div class="mermaid"> element
            const div = document.createElement('div');
            div.className = 'mermaid';
            div.textContent = code.textContent;
          
            // Replace the <pre><code> with the <div class="mermaid">
            code.parentNode.replaceWith(div);
          
            // Render the Mermaid diagram
            mermaid.init(undefined, div);
          });
        };
      }
    }

    // Function to initialize on initial page load
    function init() {
      initMathJax();
      initMermaid();
    }

    // Call init() on initial page load
    document.addEventListener('DOMContentLoaded', init);

    // Call init() on each page transition
    swup.hooks.on('page:view', init);