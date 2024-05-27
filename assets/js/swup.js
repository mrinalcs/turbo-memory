---
permalink: /script
---

import Swup from '/assets/js/swup@4.6.1/dist/Swup.module.js?module';
import SwupPreloadPlugin from '/assets/js/@swup/preload-plugin@3.2.10/dist/index.module.js?module';
import SwupScrollPlugin from '/assets/js/@swup/scroll-plugin@3.3.2/dist/index.module.js?module';

const swup = new Swup({
  containers: ["main", "link[rel='canonical']"],
  plugins: [new SwupPreloadPlugin({ preloadVisibleLinks: true }),
    
  new SwupScrollPlugin({
    animateScroll: false,
    shouldResetScrollPosition: (link) => !link.matches('.backlink')
  })]

});


// Function to initialize MathJax
function initMathJax() {
  // Check for mathematical syntax in the page content
  if (document.body.innerHTML.match(/\\\(|\\\[|\\begin{.*?}/)) {
    if (typeof MathJax === 'undefined') {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = '/assets/js/MathJax.js?config=TeX-AMS_CHTML-full';
      script.onload = () => {
        MathJax.Hub.Config({
          showMathMenu: false,
          showProcessingMessages: false,
          messageStyle: 'none'
        });
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]); // Initial typeset after loading
      };
      document.head.appendChild(script);
    } else {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]); // Re-render math on subsequent transitions
    }
  }
}


    
  // Function to initialize Mermaid
function initMermaid() {
  // Check if there are elements with the class '.language-mermaid'
  if (document.querySelector('.language-mermaid')) {
    // Check if Mermaid is already defined
    if (typeof mermaid === 'undefined') {
      // Load the Mermaid library dynamically
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = '/assets/js/mermaid.min.js';
      document.head.appendChild(script);
      
      // Initialize Mermaid after the library is loaded
      script.onload = function() {
        // Replace <pre><code> with <div class="mermaid">
        document.querySelectorAll('pre code.language-mermaid').forEach((code) => {
          const div = document.createElement('div');
          div.className = 'mermaid';
          div.textContent = code.textContent;
          code.parentNode.replaceWith(div);
          mermaid.init(undefined, div); // Render the Mermaid diagram
        });
      };
    } else {
      // Replace <pre><code> with <div class="mermaid">
      document.querySelectorAll('pre code.language-mermaid').forEach((code) => {
        const div = document.createElement('div');
        div.className = 'mermaid';
        div.textContent = code.textContent;
        code.parentNode.replaceWith(div);
        mermaid.init(undefined, div); // Render the Mermaid diagram
      });
    }
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