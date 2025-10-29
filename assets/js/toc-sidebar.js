/*
  TOC Sidebar behavior for Reimu theme
  - Smooth scroll with header offset
  - Active highlight using IntersectionObserver
  - Expand/collapse nested lists based on current section
  - Preserve existing classes: .sidebar-toc-wrapper, .active, .current
*/
(function () {
  // Tunable behavior
  const CONFIG = {
    approachMargin: 200,     // px before top to start highlighting upcoming section
    scrollOffsetExtra: 40,   // extra offset for fallback top check
    clickLockMs: 0,          // will be set to scrollDuration + 100
    scrollDuration: 500      // ms for smooth scroll animation
  };
  CONFIG.clickLockMs = CONFIG.scrollDuration + 100;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const tocWrap = $('.sidebar-toc-wrapper[data-toc="sidebar"]');
  if (!tocWrap) return;

  // Determine header offset (account for fixed header)
  const header = $('#header');
  const defaultOffset = 80; // fallback
  const getOffset = () => {
    if (!header) return defaultOffset;
    const rect = header.getBoundingClientRect();
    // If header is fixed, use its height; else fallback
    const style = window.getComputedStyle(header);
    const isFixed = style.position === 'fixed' || style.position === 'sticky';
    const h = header.offsetHeight || 0;
    return isFixed ? Math.max(h, defaultOffset) : defaultOffset;
  };

  // Normalize TOC anchors: Hugo generates <nav id="TableOfContents"> with <a href="#id">
  const tocLinks = $$('a[href^="#"]', tocWrap);
  if (!tocLinks.length) return;

  // Mark items that have children for styling (carets)
  $$('.sidebar-toc-wrapper li', tocWrap).forEach((li) => {
    const hasChild = Array.from(li.children).some((c) => c && (c.tagName === 'UL' || c.tagName === 'OL'));
    if (hasChild) li.classList.add('has-children');
  });

  // Map heading IDs to link elements
  const idToLink = new Map();
  tocLinks.forEach((a) => {
    try {
      const id = decodeURIComponent(a.getAttribute('href') || '').replace(/^#/, '');
      if (id) idToLink.set(id, a);
    } catch (_) {
      // ignore
    }
  });

  // Collect actual headings present in article
  const article = $('.article-entry');
  if (!article) return;
  const headings = $$(
    'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]',
    article
  ).filter((h) => idToLink.has(h.id));
  if (!headings.length) return;

  // Smooth scroll with offset (custom animation for consistent speed)
  let cancelOngoingScroll = null;
  function smoothScrollTo(targetY) {
    // cancel previous animation if any
    if (typeof cancelOngoingScroll === 'function') {
      cancelOngoingScroll();
      cancelOngoingScroll = null;
    }
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    const startTime = performance.now();
    const duration = CONFIG.scrollDuration;
    const ease = (t) => t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2; // easeInOutCubic
    let running = true;
    cancelOngoingScroll = () => { running = false; };
    function step(now) {
      const elapsed = Math.min((now - startTime) / duration, 1);
      const eased = ease(elapsed);
      if (!running) return;
      window.scrollTo(0, startY + diff * eased);
      if (elapsed < 1 && running) {
        requestAnimationFrame(step);
      } else {
        // Attempt to dispatch a scrollend-like effect
        try { window.dispatchEvent(new Event('scrollend')); } catch (_) {}
      }
    }
    requestAnimationFrame(step);
  }

  function getScrollTargetY(el) {
    const offset = getOffset();
    const y = window.pageYOffset + el.getBoundingClientRect().top - offset - 8; // extra spacing
    return y < 0 ? 0 : y;
  }

  // Click behavior
  let clickScrollLock = false;
  tocLinks.forEach((a) => {
    a.addEventListener('click', (e) => {
      // prevent PJAX or other handlers from hijacking
      e.stopPropagation();
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      clickScrollLock = true;
      // immediately reflect the selection in TOC for perfect sync
      setActive(a);
      smoothScrollTo(getScrollTargetY(target));
      // Update URL hash without instant jump
      history.pushState(null, '', `#${id}`);
      // After smooth scroll ends, release lock and force set active
      const release = () => {
        clickScrollLock = false;
        const link = idToLink.get(id);
        if (link) setActive(link);
      };
      // Prefer scrollend if supported
      let timeoutId = setTimeout(release, CONFIG.clickLockMs);
      const onScrollEnd = () => {
        clearTimeout(timeoutId);
        window.removeEventListener('scrollend', onScrollEnd);
        release();
      };
      try {
        window.addEventListener('scrollend', onScrollEnd, { once: true });
      } catch (_) {
        // some browsers may not support scrollend
      }
    });
  });

  // Utilities to expand parent lists for an active link
  function setActive(link) {
    // Clear existing
    $$('.sidebar-toc-wrapper .active, .sidebar-toc-wrapper .current', tocWrap).forEach((li) => {
      li.classList.remove('active');
      li.classList.remove('current');
    });

    if (!link) return;
    // Mark current <li>
    const li = link.closest('li');
    if (li) li.classList.add('current');
    // Expand ancestors
    let p = li && li.parentElement;
    while (p && p !== tocWrap) {
      if (p.tagName === 'UL' || p.tagName === 'OL') {
        const pli = p.closest('li');
        if (pli) pli.classList.add('active');
      }
      p = p.parentElement;
    }
    // Ensure visibility within scrollable container
    try {
      const wrapRect = tocWrap.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const overTop = linkRect.top < wrapRect.top;
      const overBottom = linkRect.bottom > wrapRect.bottom;
      if (overTop || overBottom) {
        tocWrap.scrollTo({
          top: tocWrap.scrollTop + (linkRect.top - wrapRect.top) - 40,
          behavior: 'smooth',
        });
      }
    } catch (_) {}
  }

  // IntersectionObserver to highlight active section
  let ticking = false;
  let observer = null;
  const buildObserver = () => {
    const marginTop = getOffset() + CONFIG.approachMargin; // trigger highlight earlier
    observer = new IntersectionObserver(
      (entries) => {
      // Pick the entry closest to the top that is intersecting
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
      const topMost = visible[0] || null;
      if (!topMost) return;
      const id = topMost.target.id;
      const link = idToLink.get(id);
      if (!link) return;
      if (clickScrollLock) return; // don't fight with click-driven scroll
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setActive(link);
          ticking = false;
        });
        ticking = true;
      }
    },
    {
      // Root margin accounts for header height; highlight earlier when approaching
      root: null,
      rootMargin: `-${marginTop}px 0px -65% 0px`,
      threshold: [0.01, 0.2, 0.6, 1],
    }
    );
    // Observe headings
    headings.forEach((h) => observer.observe(h));
  };

  buildObserver();

  // Set initial active based on location hash or first heading
  const initialId = decodeURIComponent((location.hash || '').replace('#', ''));
  const initialLink = idToLink.get(initialId) || idToLink.get(headings[0].id);
  if (initialLink) setActive(initialLink);

  // Handle PJAX or AOS scroll events: throttle on scroll to recompute active if IO is not firing (fallback)
  let lastKnownScroll = 0;
  let rafId = null;
  function onScroll() {
    lastKnownScroll = window.scrollY || window.pageYOffset;
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      // Find the heading just below the top offset
      const offset = getOffset() + CONFIG.scrollOffsetExtra + CONFIG.approachMargin / 4; // highlight slightly before reaching
      let best = null;
      for (let i = 0; i < headings.length; i++) {
        const h = headings[i];
        const top = h.getBoundingClientRect().top;
        if (top - offset <= 0) best = h; else break;
      }
      if (best) {
        const link = idToLink.get(best.id);
        if (link && !clickScrollLock) setActive(link);
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // Recalculate on resize for offset changes
  window.addEventListener('resize', () => {
    // rebuild observer to update rootMargin based on new header height
    try { observer && observer.disconnect && observer.disconnect(); } catch (_) {}
    buildObserver();
  });
})();
