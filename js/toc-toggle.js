// TOC Toggle Functionality - Compatible with Reimu Theme
(function() {
    'use strict';
    
    let tocItems = [];
    let headings = [];
    let currentActiveItem = null;
    let isScrolling = false;
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initTOCToggle();
        initScrollSync();
    });
    
    function initTOCToggle() {
        const toc = document.getElementById('TableOfContents');
        if (!toc) return;
        
        // Find all top-level TOC items (H2s)
        const topLevelItems = toc.querySelectorAll(':scope > ul > li');
        
        topLevelItems.forEach(function(item) {
            const link = item.querySelector('a');
            const nestedList = item.querySelector('ul');
            
            if (link && nestedList) {
                // Add toggle icon
                const icon = document.createElement('span');
                icon.className = 'toc-toggle-icon';
                link.insertBefore(icon, link.firstChild);
                
                // Add click handler
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    toggleTOCItem(item);
                    
                    // Still navigate to the section
                    const href = link.getAttribute('href');
                    if (href) {
                        const targetElement = document.querySelector(href);
                        if (targetElement) {
                            isScrolling = true;
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                            
                            // Reset scrolling flag after animation
                            setTimeout(() => {
                                isScrolling = false;
                            }, 1000);
                        }
                    }
                });
                
                // Store reference for scroll sync
                tocItems.push({
                    element: item,
                    link: link,
                    href: link.getAttribute('href')
                });
            }
        });
        
        // Hide all nested lists initially
        toc.querySelectorAll('ul ul').forEach(function(nestedList) {
            nestedList.style.maxHeight = '0';
            nestedList.style.overflow = 'hidden';
        });
    }
    
    function toggleTOCItem(item) {
        const isExpanded = item.classList.contains('expanded');
        
        // Close all other items first
        document.querySelectorAll('#TableOfContents > ul > li.expanded').forEach(function(expandedItem) {
            if (expandedItem !== item) {
                expandedItem.classList.remove('expanded');
                const nestedList = expandedItem.querySelector('ul');
                if (nestedList) {
                    nestedList.style.maxHeight = '0';
                }
            }
        });
        
        // Toggle current item
        if (isExpanded) {
            item.classList.remove('expanded');
            const nestedList = item.querySelector('ul');
            if (nestedList) {
                nestedList.style.maxHeight = '0';
            }
        } else {
            item.classList.add('expanded');
            const nestedList = item.querySelector('ul');
            if (nestedList) {
                nestedList.style.maxHeight = nestedList.scrollHeight + 'px';
            }
        }
    }
    
    function initScrollSync() {
        // Collect all headings
        headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
            .filter(heading => heading.id)
            .map(heading => ({
                element: heading,
                id: heading.id,
                top: heading.offsetTop
            }));
        
        // Add scroll listener
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (isScrolling) return; // Skip during programmatic scrolling
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateActiveSection, 100);
        });
        
        // Initial check
        updateActiveSection();
    }
    
    function updateActiveSection() {
        if (isScrolling) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const viewportCenter = scrollTop + (windowHeight * 0.3); // 30% from top
        
        let activeHeading = null;
        
        // Find the heading closest to the viewport center
        for (let i = headings.length - 1; i >= 0; i--) {
            const heading = headings[i];
            if (heading.top <= viewportCenter) {
                activeHeading = heading;
                break;
            }
        }
        
        if (activeHeading) {
            updateTOCHighlight(activeHeading.id);
        }
    }
    
    function updateTOCHighlight(activeId) {
        // Remove previous active states
        document.querySelectorAll('#TableOfContents li.active').forEach(function(item) {
            item.classList.remove('active');
        });
        
        // Find and highlight the active TOC item
        const activeLink = document.querySelector(`#TableOfContents a[href="#${activeId}"]`);
        if (activeLink) {
            const activeItem = activeLink.closest('li');
            if (activeItem) {
                activeItem.classList.add('active');
                
                // If this is a nested item, expand its parent
                const parentItem = activeItem.closest('#TableOfContents > ul > li');
                if (parentItem && parentItem !== activeItem) {
                    // This is a nested item, expand parent
                    if (!parentItem.classList.contains('expanded')) {
                        expandTOCItem(parentItem);
                    }
                } else if (parentItem === activeItem) {
                    // This is a top-level item, expand it if it has children
                    const hasChildren = activeItem.querySelector('ul');
                    if (hasChildren && !activeItem.classList.contains('expanded')) {
                        expandTOCItem(activeItem);
                    }
                }
            }
        }
    }
    
    function expandTOCItem(item) {
        // Close other expanded items
        document.querySelectorAll('#TableOfContents > ul > li.expanded').forEach(function(expandedItem) {
            if (expandedItem !== item) {
                expandedItem.classList.remove('expanded');
                const nestedList = expandedItem.querySelector('ul');
                if (nestedList) {
                    nestedList.style.maxHeight = '0';
                }
            }
        });
        
        // Expand target item
        item.classList.add('expanded');
        const nestedList = item.querySelector('ul');
        if (nestedList) {
            nestedList.style.maxHeight = nestedList.scrollHeight + 'px';
        }
    }
    
    // Handle window resize to recalculate heading positions
    window.addEventListener('resize', function() {
        setTimeout(function() {
            headings.forEach(function(heading) {
                heading.top = heading.element.offsetTop;
            });
            updateActiveSection();
        }, 100);
    });
    
})();