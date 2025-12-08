const fs = require('fs');
const path = require('path');

// List of all files to fix
const filesToFix = [
  'company/careers.html',
  'company/contact.html',
  'company/partnerships.html',
  'company/team.html',
  'company/why-armenia.html',
  'technology/technology.html',
  'technology/ethics-security.html',
  'terms/privacy-policy.html',
  'terms/terms-service.html',
  'research.html'
];

// Read the working JavaScript from selenex-landing.html
const workingLandingPage = fs.readFileSync('selenex-landing.html', 'utf8');

// Extract the dropdown JavaScript section from the working page
// Find the script tag that contains the dropdown functionality
const scriptMatch = workingLandingPage.match(/<script>[\s\S]*?\/\/ Dropdown functionality[\s\S]*?document\.addEventListener\('DOMContentLoaded', function \(\) \{[\s\S]*?\}\);[\s\S]*?<\/script>/);

if (!scriptMatch) {
  console.error('Could not find dropdown JavaScript in working page');
  process.exit(1);
}

// Extract just the dropdown functionality section
const dropdownJSMatch = workingLandingPage.match(/\/\/ Dropdown functionality([\s\S]*?)techDropdown\.addEventListener\('mouseenter', openTechMenu);([\s\S]*?)\}\);[\s\S]*?\/\/ Mobile menu functionality/m);

// We need to extract the complete dropdown section
const dropdownStartMarker = '// Dropdown functionality';
const dropdownEndMarker = '// Mobile menu functionality';

const dropdownStartIndex = workingLandingPage.indexOf(dropdownStartMarker);
const dropdownEndIndex = workingLandingPage.indexOf(dropdownEndMarker);

if (dropdownStartIndex === -1 || dropdownEndIndex === -1) {
  console.error('Could not find dropdown markers in working page');
  process.exit(1);
}

// Extract the complete working script section (from first DOMContentLoaded to end of script tag)
// We want from "// Dropdown functionality" through the closing of that DOMContentLoaded listener
const workingDropdownJS = workingLandingPage.substring(dropdownStartIndex, dropdownEndIndex);

// Extract mobile menu functions too
const mobileStartMarker = '// Mobile menu functionality';
const mobileEndMarker = '// Footer glow button mouse-follow effect';

const mobileStartIndex = workingLandingPage.indexOf(mobileStartMarker);
const mobileEndIndex = workingLandingPage.indexOf(mobileEndMarker);

if (mobileStartIndex === -1 || mobileEndIndex === -1) {
  console.error('Could not find mobile menu markers');
  process.exit(1);
}

const workingMobileJS = workingLandingPage.substring(mobileStartIndex, mobileEndIndex);

// Now let's get the IntersectionObserver from the working page
const intersectionObserverMatch = workingLandingPage.match(/document\.addEventListener\('DOMContentLoaded', function \(\) \{[\s\S]*?const observer = new IntersectionObserver\([\s\S]*?\}\);[\s\S]*?\}\);[\s\S]*?\/\/ Dropdown functionality/);

// Better approach: Let's read the full script section and reconstruct it properly
function fixJavaScriptForFile(filePath) {
  console.log(`\nFixing: ${filePath}`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find the script tag that contains the broken code
  const scriptTagMatch = content.match(/<script>([\s\S]*?)<\/script>/);
  
  if (!scriptTagMatch) {
    console.log(`  No script tag found in ${filePath}`);
    return;
  }
  
  const currentScript = scriptTagMatch[1];
  
  // Extract IntersectionObserver pattern from working page
  const intersectionObserverPattern = /document\.addEventListener\('DOMContentLoaded', function \(\) \{[\s\S]*?const observer = new IntersectionObserver\(\(entries\) => \{[\s\S]*?\},[\s\S]*?\);[\s\S]*?\}\);[\s\S]*?\/\/ Dropdown functionality/;
  
  // Actually, let's just replace the entire broken script section with the working one
  // But we need to preserve page-specific code like IntersectionObserver if it's different
  
  // Strategy: Replace everything from the broken IntersectionObserver through the dropdown code
  // with the working versions
  
  // Find where the broken IntersectionObserver starts
  const brokenObserverStart = content.indexOf('document.addEventListener(\'DOMContentLoaded\', () => {');
  
  if (brokenObserverStart === -1) {
    console.log(`  Could not find broken observer in ${filePath}`);
    // Try to find the script tag and replace everything
    const scriptTagStart = content.indexOf('<script>');
    const scriptTagEnd = content.indexOf('</script>', scriptTagStart);
    
    if (scriptTagStart === -1 || scriptTagEnd === -1) {
      console.log(`  Could not find script tags in ${filePath}`);
      return;
    }
    
    // Replace entire script section with working version
    const beforeScript = content.substring(0, scriptTagStart);
    const afterScript = content.substring(scriptTagEnd + 9);
    
    // Build the new script section
    const newScript = `  <script>
    document.addEventListener('DOMContentLoaded', function () {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px',
      });

      const elementsToObserve = document.querySelectorAll('.animate-on-scroll');
      elementsToObserve.forEach(el => observer.observe(el));
    });

    // Initialize Lucide icons
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

      // Calculate viewport-centered position for dropdowns - closer to navbar
      function positionDropdown(dropdown) {
        const navbar = document.querySelector('nav');
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
        if (!techDropdown.contains(e.target)) {
          closeTechMenu();
        }
        if (!companyDropdown.contains(e.target)) {
          closeCompanyMenu();
        }
      });
    });

    // Mobile menu functionality
    function toggleMobileMenu() {
      const mobileMenu = document.getElementById('mobile-menu');
      const mobileMenuPanel = document.getElementById('mobile-menu-panel');

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

      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        chevron.classList.add('rotate-180');
      } else {
        content.classList.add('hidden');
        chevron.classList.remove('rotate-180');
      }
    }

    // Footer glow button mouse-follow effect
    document.addEventListener('DOMContentLoaded', function () {
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
  </script>`;
    
    const newContent = beforeScript + newScript + afterScript;
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`  ✓ Fixed ${filePath}`);
    return;
  }
  
  // Find where to end the replacement (before the closing script tag)
  const scriptEnd = content.indexOf('</script>', brokenObserverStart);
  
  if (scriptEnd === -1) {
    console.log(`  Could not find script end in ${filePath}`);
    return;
  }
  
  // Find the start of the script tag
  const scriptStart = content.lastIndexOf('<script>', brokenObserverStart);
  
  if (scriptStart === -1) {
    console.log(`  Could not find script start in ${filePath}`);
    return;
  }
  
  // Build new content
  const beforeScript = content.substring(0, scriptStart);
  const afterScript = content.substring(scriptEnd + 9);
  
  // Insert working script
  const newScript = `  <script>
    document.addEventListener('DOMContentLoaded', function () {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px',
      });

      const elementsToObserve = document.querySelectorAll('.animate-on-scroll');
      elementsToObserve.forEach(el => observer.observe(el));
    });

    // Initialize Lucide icons
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

      // Calculate viewport-centered position for dropdowns - closer to navbar
      function positionDropdown(dropdown) {
        const navbar = document.querySelector('nav');
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
        if (!techDropdown.contains(e.target)) {
          closeTechMenu();
        }
        if (!companyDropdown.contains(e.target)) {
          closeCompanyMenu();
        }
      });
    });

    // Mobile menu functionality
    function toggleMobileMenu() {
      const mobileMenu = document.getElementById('mobile-menu');
      const mobileMenuPanel = document.getElementById('mobile-menu-panel');

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

      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        chevron.classList.add('rotate-180');
      } else {
        content.classList.add('hidden');
        chevron.classList.remove('rotate-180');
      }
    }

    // Footer glow button mouse-follow effect
    document.addEventListener('DOMContentLoaded', function () {
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
  </script>`;
  
  const newContent = beforeScript + newScript + afterScript;
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`  ✓ Fixed ${filePath}`);
}

// Fix all files
console.log('Fixing JavaScript in all pages...\n');

filesToFix.forEach(file => {
  try {
    fixJavaScriptForFile(file);
  } catch (error) {
    console.error(`  ✗ Error fixing ${file}:`, error.message);
  }
});

console.log('\n✓ Done! All files have been fixed.');

