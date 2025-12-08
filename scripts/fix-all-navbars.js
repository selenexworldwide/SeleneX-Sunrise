// Comprehensive script to fix all navbar issues across all pages
// 1. Fix image paths based on directory depth
// 2. Add missing dropdown CSS styles
// 3. Update JavaScript with wind animations

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// Pages to update with their directory depth (for relative paths)
const PAGES_TO_UPDATE = [
  { path: 'company/careers.html', depth: 1, needsJS: true, needsCSS: true },
  { path: 'company/contact.html', depth: 1, needsJS: true, needsCSS: true },
  { path: 'company/partnerships.html', depth: 1, needsJS: true, needsCSS: true },
  { path: 'company/team.html', depth: 1, needsJS: true, needsCSS: true },
  { path: 'company/why-armenia.html', depth: 1, needsJS: true, needsCSS: true },
  { path: 'technology/ethics-security.html', depth: 1, needsJS: true, needsCSS: true },
  { path: 'technology/technology.html', depth: 1, needsJS: true, needsCSS: true },
  { path: 'terms/privacy-policy.html', depth: 2, needsJS: true, needsCSS: true },
  { path: 'terms/terms-service.html', depth: 2, needsJS: true, needsCSS: true },
  { path: 'research.html', depth: 0, needsJS: true, needsCSS: true },
];

// Dropdown CSS styles (from landing page)
const DROPDOWN_CSS = `
    /* Navbar glass effect - Gray liquid glass */
    .nav-glass {
      background: linear-gradient(
        180deg,
        rgba(55, 55, 55, 0.4),
        rgba(40, 40, 40, 0.35)
      );
      backdrop-filter: blur(24px) saturate(180%);
      -webkit-backdrop-filter: blur(24px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(255, 255, 255, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }

    /* Desktop dropdown liquid glass panels - Gray elegant style */
    .dropdown-glass {
      background: linear-gradient(
        180deg,
        rgba(55, 55, 55, 0.65),
        rgba(40, 40, 40, 0.6)
      );
      backdrop-filter: blur(32px) saturate(180%);
      -webkit-backdrop-filter: blur(32px) saturate(180%);
      border-radius: 2rem;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(255, 255, 255, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.12);
    }

    /* Dropdown wrapper for proper sizing and viewport centering */
    .dropdown-wrapper {
      min-width: 900px;
      max-width: 1200px;
      width: max-content;
      position: fixed;
      left: 50%;
      top: 72px;
      z-index: 9999;
      transform: translateX(-50%);
      will-change: transform, opacity, max-height;
      overflow: hidden;
    }

    /* Wind-style dropdown animation - expands from top like a curtain */
    .dropdown-wrapper.opacity-0 {
      opacity: 0;
      visibility: hidden;
      max-height: 0;
      transform: translateX(-50%);
      transition: opacity 0.3s ease-out 0.2s,
                  visibility 0.3s ease-out 0.2s,
                  max-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    }

    .dropdown-wrapper.opacity-100 {
      opacity: 1;
      visibility: visible;
      max-height: 800px;
      transform: translateX(-50%);
      transition: opacity 0.4s ease-out 0.15s,
                  visibility 0.4s ease-out 0.15s,
                  max-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    /* Wind-style fade-in/out for dropdown content - reveals/collapses smoothly */
    .dropdown-wrapper.opacity-0 .dropdown-container {
      opacity: 0;
      transform: translateY(-10px);
      transition: opacity 0.3s ease-out 0s,
                  transform 0.3s ease-out 0s;
    }

    .dropdown-wrapper.opacity-100 .dropdown-container {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 0.5s ease-out 0.25s,
                  transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.25s;
    }

    /* Elegant staggered animation for dropdown cards - fades in/out with wind */
    .dropdown-wrapper.opacity-0 .dropdown-card {
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.25s ease-out 0s,
                  transform 0.25s ease-out 0s;
    }

    .dropdown-wrapper.opacity-100 .dropdown-card {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .dropdown-wrapper.opacity-100 .dropdown-card:nth-child(1) {
      transition-delay: 0.3s;
    }

    .dropdown-wrapper.opacity-100 .dropdown-card:nth-child(2) {
      transition-delay: 0.35s;
    }

    .dropdown-wrapper.opacity-100 .dropdown-card:nth-child(3) {
      transition-delay: 0.4s;
    }

    .dropdown-wrapper.opacity-100 .dropdown-card:nth-child(4) {
      transition-delay: 0.45s;
    }

    .dropdown-wrapper.opacity-100 .dropdown-card:nth-child(5) {
      transition-delay: 0.5s;
    }

    .dropdown-wrapper.opacity-100 .dropdown-card:nth-child(6) {
      transition-delay: 0.55s;
    }

    /* Dropdown container - spacious layout */
    .dropdown-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      padding: 2.5rem;
      width: 100%;
    }

    /* Dropdown left section */
    .dropdown-left {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    /* Dropdown title - ensure white color */
    .dropdown-title {
      font-size: 1.75rem;
      font-weight: 600;
      color: white !important;
      line-height: 1.2;
      margin-bottom: 0.5rem;
    }

    /* Dropdown description - ensure white color */
    .dropdown-description {
      font-size: 0.9375rem;
      color: rgba(255, 255, 255, 0.85) !important;
      line-height: 1.6;
      max-width: 500px;
      margin-bottom: 1rem;
    }

    /* Title and description fade in/out as wind reveals/collapses */
    .dropdown-wrapper.opacity-0 .dropdown-title,
    .dropdown-wrapper.opacity-0 .dropdown-description {
      opacity: 0;
      transform: translateY(-5px);
      transition: opacity 0.3s ease-out 0s,
                  transform 0.3s ease-out 0s;
    }

    .dropdown-wrapper.opacity-100 .dropdown-title {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 0.45s ease-out 0.3s, transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s;
    }

    .dropdown-wrapper.opacity-100 .dropdown-description {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 0.5s ease-out 0.35s, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.35s;
    }

    /* Dropdown image cards grid */
    .dropdown-cards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-top: 1rem;
    }

    #company-menu .dropdown-cards-grid {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
    }

    .dropdown-card {
      position: relative;
      overflow: hidden;
      border-radius: 1rem;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.05);
    }

    .dropdown-card:hover {
      transform: translateY(-6px) scale(1.02);
      border-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3),
                  0 0 0 1px rgba(255, 255, 255, 0.1);
    }

    .dropdown-card-image {
      width: 100%;
      height: 140px;
      object-fit: cover;
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .dropdown-card:hover .dropdown-card-image {
      transform: scale(1.08);
    }

    /* Elegant shimmer effect on hover */
    .dropdown-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      );
      transition: left 0.6s ease;
      z-index: 1;
    }

    .dropdown-card:hover::before {
      left: 100%;
    }

    .dropdown-card-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(0, 0, 0, 0.3) 60%,
        rgba(0, 0, 0, 0.6) 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .dropdown-card:hover .dropdown-card-overlay {
      opacity: 1;
    }

    .dropdown-card-label {
      position: absolute;
      bottom: 0.75rem;
      left: 0.75rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.9;
      z-index: 2;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .dropdown-card:hover .dropdown-card-label {
      opacity: 1;
      transform: translateY(-2px);
    }

    /* Elegant CTA button animations */
    .dropdown-cta-button {
      position: relative;
      overflow: hidden;
    }

    .dropdown-cta-button svg {
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .dropdown-cta-button:hover svg {
      transform: translateX(4px);
    }

    .dropdown-cta-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.15),
        transparent
      );
      transition: left 0.6s ease;
    }

    .dropdown-cta-button:hover::before {
      left: 100%;
    }

    /* Dropdown right section */
    .dropdown-right {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .dropdown-right-content {
      flex: 1;
    }

    /* Dropdown right section - ensure white colors */
    .dropdown-right-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: white !important;
      line-height: 1.3;
      margin-bottom: 1rem;
    }

    .dropdown-right-text {
      font-size: 0.9375rem;
      color: rgba(255, 255, 255, 0.85) !important;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    /* Right section content fades in/out as wind reveals/collapses */
    .dropdown-wrapper.opacity-0 .dropdown-right-title,
    .dropdown-wrapper.opacity-0 .dropdown-right-text,
    .dropdown-wrapper.opacity-0 .dropdown-featured-image {
      opacity: 0;
      transition: opacity 0.3s ease-out 0s;
    }

    .dropdown-wrapper.opacity-100 .dropdown-right-title {
      opacity: 1;
      transition: opacity 0.5s ease-out 0.4s;
    }

    .dropdown-wrapper.opacity-100 .dropdown-right-text {
      opacity: 1;
      transition: opacity 0.5s ease-out 0.45s;
    }

    .dropdown-wrapper.opacity-100 .dropdown-featured-image {
      opacity: 1;
      transition: opacity 0.5s ease-out 0.5s;
    }

    .dropdown-featured-image {
      width: 100%;
      height: 280px;
      object-fit: cover;
      border-radius: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1),
                  box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    }

    .dropdown-featured-image:hover {
      transform: scale(1.03);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }

    /* Responsive adjustments */
    @media (max-width: 1024px) {
      .dropdown-wrapper {
        min-width: 600px;
        max-width: calc(100vw - 2rem);
        left: 50% !important;
        transform: translateX(-50%) !important;
      }

      .dropdown-container {
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 2rem;
      }

      .dropdown-cards-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .dropdown-wrapper {
        min-width: calc(100vw - 1rem);
        max-width: calc(100vw - 1rem);
        left: 50% !important;
        transform: translateX(-50%) !important;
        top: 70px !important;
      }

      .dropdown-container {
        padding: 1.5rem;
        gap: 1.5rem;
      }

      .dropdown-cards-grid {
        grid-template-columns: 1fr;
      }

      .dropdown-title {
        font-size: 1.5rem;
      }

      .dropdown-right-title {
        font-size: 1.25rem;
      }
    }

    .nav-btn-glass {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06));
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    .nav-btn-glass:hover {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.1));
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
`;

// Correct JavaScript (from landing page)
const CORRECT_DROPDOWN_JS = `    // Initialize Lucide icons
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }

    // Dropdown functionality
    document.addEventListener('DOMContentLoaded', function () {
      // Tech dropdown
      const techTrigger = document.getElementById('tech-trigger');
      const techMenu = document.getElementById('tech-menu');
      const techChevron = document.getElementById('tech-chevron');
      const techDropdown = document.getElementById('tech-dropdown');

      // Company dropdown
      const companyTrigger = document.getElementById('company-trigger');
      const companyMenu = document.getElementById('company-menu');
      const companyChevron = document.getElementById('company-chevron');
      const companyDropdown = document.getElementById('company-dropdown');

      if (!techTrigger || !techMenu || !techChevron || !techDropdown) return;
      if (!companyTrigger || !companyMenu || !companyChevron || !companyDropdown) return;

      // Calculate viewport-centered position for dropdowns - closer to navbar
      function positionDropdown(dropdown) {
        const navbar = document.querySelector('nav');
        if (!navbar) return;
        const navbarRect = navbar.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const dropdownWidth = Math.min(1200, viewportWidth - 32);
        
        dropdown.style.top = (navbarRect.bottom + 8) + 'px';
        dropdown.style.left = '50%';
        dropdown.style.maxWidth = dropdownWidth + 'px';
        dropdown.style.transform = 'translateX(-50%)';
        
        // Set max-height for wind animation (measure actual height)
        if (!dropdown.classList.contains('opacity-0')) {
          const container = dropdown.querySelector('.dropdown-glass');
          if (container) {
            const height = container.scrollHeight;
            dropdown.style.maxHeight = (height + 20) + 'px';
          }
        }
      }

      function openTechMenu() {
        positionDropdown(techMenu);
        // Reset max-height before opening for wind effect
        techMenu.style.maxHeight = '0';
        // Force reflow
        void techMenu.offsetWidth;
        techMenu.classList.remove('opacity-0', 'invisible');
        techMenu.classList.add('opacity-100', 'visible');
        techChevron.classList.add('rotate-180');
        // Set final height after a frame
        requestAnimationFrame(() => {
          const container = techMenu.querySelector('.dropdown-glass');
          if (container) {
            techMenu.style.maxHeight = (container.scrollHeight + 20) + 'px';
          }
        });
      }

      function closeTechMenu() {
        // Start closing animation - content fades out first
        techMenu.classList.add('opacity-0', 'invisible');
        techMenu.classList.remove('opacity-100', 'visible');
        techChevron.classList.remove('rotate-180');
        // Collapse height after content fades out (reverse wind effect)
        const container = techMenu.querySelector('.dropdown-glass');
        if (container) {
          techMenu.style.maxHeight = container.scrollHeight + 'px';
        }
        // Force reflow to ensure height is set
        void techMenu.offsetWidth;
        // Then collapse the height
        requestAnimationFrame(() => {
          techMenu.style.maxHeight = '0';
        });
      }

      function openCompanyMenu() {
        positionDropdown(companyMenu);
        // Reset max-height before opening for wind effect
        companyMenu.style.maxHeight = '0';
        // Force reflow
        void companyMenu.offsetWidth;
        companyMenu.classList.remove('opacity-0', 'invisible');
        companyMenu.classList.add('opacity-100', 'visible');
        companyChevron.classList.add('rotate-180');
        // Set final height after a frame
        requestAnimationFrame(() => {
          const container = companyMenu.querySelector('.dropdown-glass');
          if (container) {
            companyMenu.style.maxHeight = (container.scrollHeight + 20) + 'px';
          }
        });
      }

      function closeCompanyMenu() {
        // Start closing animation - content fades out first
        companyMenu.classList.add('opacity-0', 'invisible');
        companyMenu.classList.remove('opacity-100', 'visible');
        companyChevron.classList.remove('rotate-180');
        // Collapse height after content fades out (reverse wind effect)
        const container = companyMenu.querySelector('.dropdown-glass');
        if (container) {
          companyMenu.style.maxHeight = container.scrollHeight + 'px';
        }
        // Force reflow to ensure height is set
        void companyMenu.offsetWidth;
        // Then collapse the height
        requestAnimationFrame(() => {
          companyMenu.style.maxHeight = '0';
        });
      }

      // Reposition dropdowns on window resize
      let resizeTimeout;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
          if (techMenu && techMenu.classList.contains('opacity-100')) {
            positionDropdown(techMenu);
          }
          if (companyMenu && companyMenu.classList.contains('opacity-100')) {
            positionDropdown(companyMenu);
          }
        }, 150);
      });

      // Tech dropdown events
      techDropdown.addEventListener('mouseenter', openTechMenu);
      techDropdown.addEventListener('mouseleave', closeTechMenu);
      techTrigger.addEventListener('click', function (e) {
        e.preventDefault();
        if (techMenu.classList.contains('opacity-0')) {
          openTechMenu();
        } else {
          closeTechMenu();
        }
      });

      // Company dropdown events
      companyDropdown.addEventListener('mouseenter', openCompanyMenu);
      companyDropdown.addEventListener('mouseleave', closeCompanyMenu);
      companyTrigger.addEventListener('click', function (e) {
        e.preventDefault();
        if (companyMenu.classList.contains('opacity-0')) {
          openCompanyMenu();
        } else {
          closeCompanyMenu();
        }
      });

      // Close menus when clicking outside
      document.addEventListener('click', function (e) {
        if (techDropdown && !techDropdown.contains(e.target)) {
          closeTechMenu();
        }
        if (companyDropdown && !companyDropdown.contains(e.target)) {
          closeCompanyMenu();
        }
      });

      const glowBtn = document.getElementById('footer-waitlist-btn');
      if (glowBtn) {
        glowBtn.addEventListener('mousemove', (e) => {
          const rect = glowBtn.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          glowBtn.style.setProperty('--x', x + 'px');
          glowBtn.style.setProperty('--y', y + 'px');
        });
      }
    });

    // Mobile menu functionality
    function toggleMobileMenu() {
      const mobileMenu = document.getElementById('mobile-menu');
      const mobileMenuPanel = document.getElementById('mobile-menu-panel');

      if (!mobileMenu || !mobileMenuPanel) return;

      if (mobileMenu.classList.contains('opacity-0')) {
        mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
        mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
        mobileMenuPanel.classList.remove('-translate-y-full');
        mobileMenuPanel.classList.add('translate-y-0');
      } else {
        mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
        mobileMenuPanel.classList.add('-translate-y-full');
        mobileMenuPanel.classList.remove('translate-y-0');
      }
    }

    // Mobile accordion functionality
    function toggleAccordion(contentId, chevronId) {
      const content = document.getElementById(contentId);
      const chevron = document.getElementById(chevronId);

      if (!content || !chevron) return;

      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        chevron.classList.add('rotate-180');
      } else {
        content.classList.add('hidden');
        chevron.classList.remove('rotate-180');
      }
    }
`;

async function readFile(p) {
  return fs.promises.readFile(p, 'utf8');
}

async function writeFile(p, content) {
  await fs.promises.writeFile(p, content, 'utf8');
}

function getCorrectImagePath(depth) {
  const prefix = '../'.repeat(depth);
  return prefix + 'assets/navbar-menu-images/Selection/';
}

async function fixPage(pageInfo) {
  const filePath = path.join(ROOT, pageInfo.path);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }

  try {
    let content = await readFile(filePath);
    const correctPathPrefix = getCorrectImagePath(pageInfo.depth);
    
    // 1. Fix all image paths
    content = content.replace(/src="assets\/navbar-menu-images\/Selection\//g, `src="${correctPathPrefix}`);
    content = content.replace(/src="\.\.\/assets\/navbar-menu-images\/Selection\//g, `src="${correctPathPrefix}`);
    content = content.replace(/src="\.\.\/\.\.\/assets\/navbar-menu-images\/Selection\//g, `src="${correctPathPrefix}`);
    
    // 2. Add dropdown CSS if missing
    if (pageInfo.needsCSS) {
      const hasDropdownCSS = content.includes('.dropdown-wrapper {') || content.includes('.dropdown-glass {');
      if (!hasDropdownCSS) {
        // Find where to insert CSS (before footer styles)
        const footerCSSPattern = /(\/\* Footer gray liquid glass matching navbar \*\/|\.footer-blue)/;
        const footerMatch = content.match(footerCSSPattern);
        if (footerMatch) {
          const insertPos = content.indexOf(footerMatch[0]);
          content = content.slice(0, insertPos) + DROPDOWN_CSS + '\n    ' + content.slice(insertPos);
        } else {
          // Insert before closing </style> tag
          const styleClosePattern = /<\/style>/;
          const styleMatch = content.match(styleClosePattern);
          if (styleMatch) {
            const insertPos = content.indexOf(styleMatch[0]);
            content = content.slice(0, insertPos) + DROPDOWN_CSS + '\n  ' + content.slice(insertPos);
          }
        }
      }
    }
    
    // 3. Update JavaScript if needed
    if (pageInfo.needsJS) {
      // Check if it has old JavaScript (openMenu/closeMenu functions)
      if (content.includes('function openMenu(') && !content.includes('function openTechMenu(')) {
        // Replace old JavaScript with new
        const oldJSPattern = /(\/\/ Initialize Lucide icons[\s\S]*?)document\.addEventListener\('DOMContentLoaded',[\s\S]*?function\s+openMenu[\s\S]*?function\s+closeMenu[\s\S]*?if\s*\(techDropdown[\s\S]*?\}\)[\s\S]*?\}\);[\s]*(\/\/ Mobile menu|function toggleMobileMenu|const glowBtn)/;
        const match = content.match(oldJSPattern);
        
        if (match) {
          const beforeJS = content.substring(0, match.index);
          const afterJS = content.substring(match.index + match[1].length);
          
          // Find where the mobile menu function starts
          const mobileMenuPattern = /(\/\/ Mobile menu|function toggleMobileMenu)/;
          const mobileMatch = afterJS.match(mobileMenuPattern);
          
          if (mobileMatch) {
            const mobileStart = afterJS.indexOf(mobileMatch[0]);
            const newContent = beforeJS + CORRECT_DROPDOWN_JS + '\n\n    ' + afterJS.substring(mobileStart);
            content = newContent;
          }
        }
      }
      
      // Ensure toggleAccordion exists
      if (!content.includes('function toggleAccordion(')) {
        // Add it before closing script tag
        const scriptClosePattern = /<\/script>/;
        const scriptMatch = content.match(scriptClosePattern);
        if (scriptMatch) {
          const insertPos = content.lastIndexOf(scriptMatch[0]);
          const accordionJS = `\n\n    // Mobile accordion functionality
    function toggleAccordion(contentId, chevronId) {
      const content = document.getElementById(contentId);
      const chevron = document.getElementById(chevronId);

      if (!content || !chevron) return;

      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        chevron.classList.add('rotate-180');
      } else {
        content.classList.add('hidden');
        chevron.classList.remove('rotate-180');
      }
    }`;
          content = content.slice(0, insertPos) + accordionJS + '\n  ' + content.slice(insertPos);
        }
      }
    }
    
    await writeFile(filePath, content);
    console.log(`✅ Updated: ${pageInfo.path}`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${pageInfo.path}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('Fixing all navbar issues across all pages...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const pageInfo of PAGES_TO_UPDATE) {
    const success = await fixPage(pageInfo);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  console.log(`\n✨ Done! Updated ${successCount} files, ${failCount} failed or skipped.`);
}

main().catch(console.error);

