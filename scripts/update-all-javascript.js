// Script to update JavaScript on all pages with correct wind animations
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

const PAGES = [
  'company/contact.html',
  'company/partnerships.html',
  'company/team.html',
  'company/why-armenia.html',
  'technology/ethics-security.html',
  'technology/technology.html',
  'terms/privacy-policy.html',
  'terms/terms-service.html',
  'research.html',
];

const NEW_JS = `    // Initialize Lucide icons
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
    }`;

async function updateJS(filePath) {
  try {
    let content = await fs.promises.readFile(filePath, 'utf8');
    
    // Find and replace the old dropdown JS section
    // Look for pattern: document.addEventListener('DOMContentLoaded' ... function openMenu
    const oldJSPattern = /(\s+document\.addEventListener\('DOMContentLoaded',\s*function\s*\(\)\s*\{[\s\S]*?)(if\s*\(window\.lucide|const techTrigger)[\s\S]*?(function openMenu\(menu, chevron\)|function\s+openMenu[\s\S]*?function\s+closeMenu[\s\S]*?if\s*\(techDropdown[\s\S]*?\}\)[\s\S]*?\}\);)/;
    
    // Try a different approach - find the section between DOMContentLoaded and toggleMobileMenu
    const startPattern = /(\s+document\.addEventListener\('DOMContentLoaded',\s*function\s*\(\)\s*\{)/;
    const endPattern = /(\s+\/\/ Mobile menu|\s+function toggleMobileMenu\(\))/;
    
    const startMatch = content.match(startPattern);
    if (!startMatch) {
      console.log(`⚠️  ${filePath}: Could not find DOMContentLoaded`);
      return false;
    }
    
    const startIndex = startMatch.index;
    const afterStart = content.substring(startIndex + startMatch[0].length);
    const endMatch = afterStart.match(endPattern);
    
    if (!endMatch) {
      console.log(`⚠️  ${filePath}: Could not find toggleMobileMenu`);
      return false;
    }
    
    // Check if it has old JS (openMenu function)
    const oldJS = afterStart.substring(0, endMatch.index);
    if (!oldJS.includes('function openMenu(')) {
      console.log(`✅ ${filePath}: Already has correct JS`);
      return true;
    }
    
    // Replace the old JS section
    const before = content.substring(0, startIndex);
    const after = afterStart.substring(endMatch.index);
    
    const newContent = before + NEW_JS + after;
    await fs.promises.writeFile(filePath, newContent, 'utf8');
    console.log(`✅ Updated JS: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('Updating JavaScript on all pages...\n');
  
  let success = 0;
  for (const page of PAGES) {
    const filePath = path.join(ROOT, page);
    if (fs.existsSync(filePath)) {
      if (await updateJS(filePath)) success++;
    }
  }
  
  console.log(`\n✨ Updated ${success} files.`);
}

main().catch(console.error);

