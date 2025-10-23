// TOC Accordion for existing TOC
(function() {
  console.log('TOC Accordion Enhancement starting...');
  
  function enhanceExistingTOC() {
    console.log('Looking for existing TOC...');
    
    // Find sidebar
    const sidebar = document.querySelector('.sidebar, #sidebar, aside');
    if (!sidebar) {
      console.log('No sidebar found');
      return;
    }
    
    // Find existing TOC links
    const tocLinks = sidebar.querySelectorAll('a[href^="#"]');
    if (tocLinks.length === 0) {
      console.log('No TOC links found');
      return;
    }
    
    console.log(`Found ${tocLinks.length} TOC links, adding accordion...`);
    
    // Find content to determine heading levels
    const content = document.querySelector('.post-content, article, .content, main');
    if (!content) return;
    
    // Classify TOC links by heading level
    tocLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      
      const targetId = href.substring(1);
      const target = document.getElementById(targetId);
      
      if (target) {
        const level = parseInt(target.tagName.charAt(1));
        const li = link.closest('li');
        if (li) {
          li.classList.add(`toc-h${level}`);
          
          // Add caret for H2
          if (level === 2 && !link.querySelector('.toc-caret')) {
            const caret = document.createElement('span');
            caret.className = 'toc-caret';
            caret.textContent = '▸';
            caret.style.cssText = 'display:inline-block;margin-right:8px;color:#ff7b7b;transition:transform 0.3s ease;cursor:pointer;';
            link.insertBefore(caret, link.firstChild);
          }
        }
      }
    });
    
    // Group children under H2
    const tocContainer = tocLinks[0].closest('ul');
    if (tocContainer) {
      groupChildren(tocContainer);
      addEvents(tocContainer.parentElement);
      console.log('TOC enhanced successfully');
    }
  }
  
  function groupChildren(tocList) {
    const items = Array.from(tocList.querySelectorAll('li'));
    const h2Items = items.filter(li => li.classList.contains('toc-h2'));
    
    h2Items.forEach(h2Item => {
      const children = [];
      let next = h2Item.nextElementSibling;
      
      while (next && !next.classList.contains('toc-h2')) {
        if (next.classList.contains('toc-h3') || next.classList.contains('toc-h4')) {
          children.push(next);
        }
        next = next.nextElementSibling;
      }
      
      if (children.length > 0) {
        const childContainer = document.createElement('ul');
        childContainer.className = 'toc-children';
        childContainer.style.cssText = 'max-height:0;overflow:hidden;transition:max-height 0.3s ease;';
        
        children.forEach(child => {
          child.parentNode.removeChild(child);
          childContainer.appendChild(child);
        });
        
        h2Item.appendChild(childContainer);
      }
    });
  }
  
  function addEvents(container) {
    container.addEventListener('click', function(e) {
      const caret = e.target.closest('.toc-caret');
      const h2Link = e.target.closest('.toc-h2 > a');
      
      if (caret || (h2Link && h2Link.parentNode.classList.contains('toc-h2'))) {
        e.preventDefault();
        e.stopPropagation();
        
        const h2Item = (caret || h2Link).closest('.toc-h2');
        const children = h2Item.querySelector('.toc-children');
        const caretEl = h2Item.querySelector('.toc-caret');
        
        if (children && caretEl) {
          const isOpen = children.style.maxHeight !== '0px';
          
          // Close all
          container.querySelectorAll('.toc-children').forEach(el => {
            el.style.maxHeight = '0px';
          });
          container.querySelectorAll('.toc-caret').forEach(el => {
            el.style.transform = 'rotate(0deg)';
          });
          
          // Open current if was closed
          if (!isOpen) {
            children.style.maxHeight = '500px';
            caretEl.style.transform = 'rotate(90deg)';
          }
        }
        
        // Scroll if clicking text
        if (h2Link && !caret) {
          const target = document.querySelector(h2Link.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    });
  }
  
  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceExistingTOC);
  } else {
    enhanceExistingTOC();
  }
})();