// Script to update navbar JavaScript in all pages to match landing page
// This adds the wind-style dropdown animations and proper positioning

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// Pages to update (all pages except the main landing page)
const PAGES_TO_UPDATE = [
  'company/about.html',
  'company/careers.html',
  'company/contact.html',
  'company/partnerships.html',
  'company/team.html',
  'company/why-armenia.html',
  'technology/technology.html',
  'technology/ethics-security.html',
  'research.html',
  'terms/privacy-policy.html',
  'terms/terms-service.html',
];

// The correct JavaScript code from landing page
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

async function readFile(p) {
  return fs.promises.readFile(p, 'utf8');
}

async function writeFile(p, content) {
  await fs.promises.writeFile(p, content, 'utf8');
}

async function updatePageJavaScript(filePath) {
  try {
    let content = await readFile(filePath);
    
    // Find the old dropdown JavaScript section (between DOMContentLoaded and mobile menu)
    // Look for patterns that indicate old JavaScript
    const oldDropdownPattern = /document\.addEventListener\('DOMContentLoaded',\s*function\s*\(\)\s*\{[\s\S]*?const techTrigger[\s\S]*?function openMenu[\s\S]*?\}[\s\S]*?\}\);/;
    
    // Find where the script tag starts and ends
    const scriptStartPattern = /<script>[\s]*(\/\/ Initialize Lucide icons|document\.addEventListener\('DOMContentLoaded')/;
    const scriptMatch = content.match(scriptStartPattern);
    
    if (!scriptMatch) {
      console.log(`⚠️  ${filePath}: Could not find script section to update`);
      return false;
    }
    
    // Find the existing DOMContentLoaded section and replace it
    // We'll look for the section that contains dropdown logic
    const domContentLoadedPattern = /(\/\/ Initialize Lucide icons[\s\S]*?)document\.addEventListener\('DOMContentLoaded',[\s\S]*?function\s*openMenu[\s\S]*?function\s*closeMenu[\s\S]*?if\s*\(techDropdown[\s\S]*?\}\)[\s\S]*?\}\);[\s]*(\/\/ Mobile menu|function toggleMobileMenu|<\/script>)/;
    
    // Try a simpler approach - find and replace the entire script section
    const scriptSectionPattern = /(<script>[\s]*\/\/ Initialize Lucide icons[\s\S]*?document\.addEventListener\('DOMContentLoaded',[\s\S]*?function\s*openMenu[\s\S]*?function\s*closeMenu[\s\S]*?if\s*\(techDropdown[\s\S]*?\}\)[\s\S]*?\}\);[\s]*)(\/\/ Mobile menu|function toggleMobileMenu)/;
    
    const scriptMatch2 = content.match(scriptSectionPattern);
    
    if (scriptMatch2) {
      // Replace the old dropdown JS with the new one
      const beforeScript = content.substring(0, scriptMatch2.index);
      const afterScript = content.substring(scriptMatch2.index + scriptMatch2[1].length);
      
      const newContent = beforeScript + 
        '<script>\n' + CORRECT_DROPDOWN_JS + '\n\n    ' +
        afterScript;
      
      await writeFile(filePath, newContent);
      console.log(`✅ Updated: ${filePath}`);
      return true;
    } else {
      // Try finding the script tag and replacing everything inside
      const fullScriptPattern = /<script>([\s\S]*?)document\.addEventListener\('DOMContentLoaded',[\s\S]*?if\s*\(techDropdown[\s\S]*?\}\)[\s\S]*?\}\);[\s]*function toggleMobileMenu[\s\S]*?<\/script>/;
      
      const fullScriptMatch = content.match(fullScriptPattern);
      if (fullScriptMatch) {
        const beforeScript = content.substring(0, fullScriptMatch.index);
        const afterScript = content.substring(fullScriptMatch.index + fullScriptMatch[0].length);
        
        const newContent = beforeScript + 
          '<script>\n' + CORRECT_DROPDOWN_JS + '\n\n    ' +
          afterScript.replace(/^[\s]*/, '');
        
        await writeFile(filePath, newContent);
        console.log(`✅ Updated: ${filePath}`);
        return true;
      }
      
      console.log(`⚠️  ${filePath}: Could not find matching pattern, manual review needed`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('Updating navbar JavaScript in all pages...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const page of PAGES_TO_UPDATE) {
    const filePath = path.join(ROOT, page);
    if (fs.existsSync(filePath)) {
      const success = await updatePageJavaScript(filePath);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
      failCount++;
    }
  }
  
  console.log(`\n✨ Done! Updated ${successCount} files, ${failCount} failed or skipped.`);
}

main().catch(console.error);

