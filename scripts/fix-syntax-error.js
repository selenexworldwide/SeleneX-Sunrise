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

function fixFile(filePath) {
  console.log(`Fixing: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix the broken IntersectionObserver syntax
  // Pattern: Missing closing paren and observerOptions, and observer is never used
  const brokenPattern1 = /const observer = new IntersectionObserver\(\(entries\) => \{[\s\S]*?entries\.forEach\(\(entry\) => \{[\s\S]*?\}\);[\s\S]*?\}[\s\S]*?\/\/ Initialize Lucide icons/;
  
  if (brokenPattern1.test(content)) {
    // Replace with fixed version
    content = content.replace(
      /const observer = new IntersectionObserver\(\(entries\) => \{[\s\S]*?entries\.forEach\(\(entry\) => \{[\s\S]*?\}\);[\s\S]*?\}[\s\S]*?\/\/ Initialize Lucide icons/,
      `const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('animate-on-scroll')) {
              entry.target.style.animationPlayState = 'running';
            }
          }
        });
      }, observerOptions);

      const elementsToObserve = document.querySelectorAll('.animate-on-scroll');
      elementsToObserve.forEach(el => observer.observe(el));
    });

    // Initialize Lucide icons`
    );
    modified = true;
    console.log(`  ✓ Fixed IntersectionObserver syntax`);
  }
  
  // Also fix the case where code is floating outside
  const floatingCodePattern = /\}[\s\S]*?\/\/ Initialize Lucide icons[\s\S]*?if \(typeof lucide[\s\S]*?lucide\.createIcons\(\);[\s\S]*?\/\/ Dropdown functionality/;
  
  if (floatingCodePattern.test(content)) {
    // Move Lucide initialization inside DOMContentLoaded
    content = content.replace(
      /\}[\s\S]*?\/\/ Initialize Lucide icons[\s\S]*?if \(typeof lucide[\s\S]*?lucide\.createIcons\(\);[\s\S]*?\/\/ Dropdown functionality/,
      `});

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }

    // Dropdown functionality`
    );
    modified = true;
    console.log(`  ✓ Fixed floating code`);
  }
  
  // More comprehensive fix: Replace the entire broken section
  // Find the broken pattern and replace with working version
  const brokenSectionPattern = /document\.addEventListener\('DOMContentLoaded', \(\) => \{[\s\S]*?const observerOptions = \{[\s\S]*?threshold: 0\.1,[\s\S]*?rootMargin: '0px',[\s\S]*?\};[\s\S]*?const observer = new IntersectionObserver\(\(entries\) => \{[\s\S]*?entries\.forEach\(\(entry\) => \{[\s\S]*?if \(entry\.isIntersecting\) \{[\s\S]*?entry\.target\.classList\.add\('visible'\);[\s\S]*?if \(entry\.target\.classList\.contains\('animate-on-scroll'\)\) \{[\s\S]*?entry\.target\.style\.animationPlayState = 'running';[\s\S]*?\}[\s\S]*?\}[\s\S]*?\}\);[\s\S]*?\}[\s\S]*?\/\/ Initialize Lucide icons/;
  
  if (brokenSectionPattern.test(content)) {
    content = content.replace(
      brokenSectionPattern,
      `document.addEventListener('DOMContentLoaded', () => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px',
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('animate-on-scroll')) {
              entry.target.style.animationPlayState = 'running';
            }
          }
        });
      }, observerOptions);

      const elementsToObserve = document.querySelectorAll('.animate-on-scroll');
      elementsToObserve.forEach(el => observer.observe(el));
    });

    // Initialize Lucide icons`
    );
    modified = true;
    console.log(`  ✓ Fixed broken IntersectionObserver section`);
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Saved ${filePath}\n`);
  } else {
    console.log(`  - No fixes needed or pattern not found\n`);
  }
}

// Fix all files
console.log('Fixing syntax errors in all pages...\n');
filesToFix.forEach(fixFile);
console.log('Done!');

