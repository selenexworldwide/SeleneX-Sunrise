// Script to update navbar and footer in existing pages to use the global partials
// This replaces inline navbar/footer code with the updated partials from partials/ directory

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PARTIALS_DIR = path.join(ROOT, 'partials');

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

async function readFile(p) {
  return fs.promises.readFile(p, 'utf8');
}

async function writeFile(p, content) {
  await fs.promises.mkdir(path.dirname(p), { recursive: true });
  await fs.promises.writeFile(p, content, 'utf8');
}

function findNavbarSection(html) {
  // Find navbar start - look for gradient blur comment or fixed navbar
  const navbarStartMarkers = [
    '<!-- Shared gradient blur + navbar used across all SeleneX pages -->',
    '<div class="gradient-blur">',
    '<!-- Shared gradient blur',
  ];
  
  let startIndex = -1;
  for (const marker of navbarStartMarkers) {
    startIndex = html.indexOf(marker);
    if (startIndex !== -1) break;
  }
  
  if (startIndex === -1) {
    // Try finding after <body> tag
    const bodyEnd = html.indexOf('>', html.indexOf('<body'));
    if (bodyEnd !== -1) {
      startIndex = bodyEnd + 1;
      // Skip whitespace
      while (html[startIndex] === '\n' || html[startIndex] === ' ' || html[startIndex] === '\r') {
        startIndex++;
      }
    }
  }
  
  if (startIndex === -1) {
    return null;
  }
  
  // Find navbar end - look for mobile menu closing or main content
  let endIndex = -1;
  
  // Look for mobile menu closing
  const mobileMenuPatterns = [
    '</div>\n</div>\n\n    <!-- Hero',
    '</div>\n</div>\n\n    <main',
    '</div>\n</div>\n\n<!-- Hero',
    '</div>\n</div>\n\n<main',
    '</div>\n</div>\n\n    <!-- Page',
    '</div>\n\n    <!-- Hero',
    '</div>\n\n    <main',
  ];
  
  for (const pattern of mobileMenuPatterns) {
    const idx = html.indexOf(pattern, startIndex);
    if (idx !== -1) {
      endIndex = idx;
      break;
    }
  }
  
  if (endIndex === -1) {
    // Look for main content directly
    const mainStart = html.indexOf('<main', startIndex);
    const headerStart = html.indexOf('<header', startIndex);
    const heroStart = html.indexOf('<!-- Hero', startIndex);
    
    let contentStart = -1;
    if (mainStart !== -1 && (contentStart === -1 || mainStart < contentStart)) contentStart = mainStart;
    if (headerStart !== -1 && (contentStart === -1 || headerStart < contentStart)) contentStart = headerStart;
    if (heroStart !== -1 && (contentStart === -1 || heroStart < contentStart)) contentStart = heroStart;
    
    if (contentStart !== -1) {
      // Go back to find the closing tags before content
      endIndex = contentStart;
      // Find the last </div> before content
      let lastDiv = html.lastIndexOf('</div>', endIndex);
      if (lastDiv > startIndex) {
        endIndex = lastDiv + 6;
      }
    }
  }
  
  if (endIndex === -1 || endIndex <= startIndex) {
    return null;
  }
  
  return {
    start: startIndex,
    end: endIndex
  };
}

function findFooterSection(html) {
  // Find footer start markers
  const footerStartMarkers = [
    '<!-- Shared SeleneX footer used across all pages -->',
    '<div class="footer-white-wrapper">',
    '<footer id="contact"',
    '<footer class="footer-blue"',
  ];
  
  let startIndex = -1;
  for (const marker of footerStartMarkers) {
    startIndex = html.indexOf(marker);
    if (startIndex !== -1) break;
  }
  
  if (startIndex === -1) {
    return null;
  }
  
  // Find footer end - look for closing tags
  let endIndex = html.indexOf('</footer>', startIndex);
  if (endIndex !== -1) {
    endIndex += 9; // Include </footer>
    // Check for wrapper div
    const nextText = html.substring(endIndex, endIndex + 20).trim();
    if (nextText.startsWith('</div>')) {
      endIndex = html.indexOf('</div>', endIndex) + 6;
    }
  } else {
    // Look for closing div tags
    let depth = 0;
    let i = startIndex;
    let lastClose = -1;
    
    while (i < html.length && i < startIndex + 5000) {
      if (html.substring(i, i + 4) === '<div') {
        depth++;
        i += 4;
      } else if (html.substring(i, i + 6) === '</div>') {
        depth--;
        lastClose = i + 6;
        if (depth <= 0) {
          // Check if next content is after footer
          const after = html.substring(lastClose, lastClose + 50).trim();
          if (after.startsWith('</body>') || after.startsWith('<script') || after.length === 0) {
            endIndex = lastClose;
            break;
          }
        }
        i += 6;
      } else {
        i++;
      }
    }
    
    if (endIndex === -1 && lastClose > startIndex) {
      endIndex = lastClose;
    }
  }
  
  if (endIndex === -1 || endIndex <= startIndex) {
    return null;
  }
  
  return {
    start: startIndex,
    end: endIndex
  };
}

async function updatePages() {
  console.log('Reading partials...\n');
  
  const navbarContent = await readFile(path.join(PARTIALS_DIR, 'navbar.html'));
  const footerContent = await readFile(path.join(PARTIALS_DIR, 'footer.html'));
  
  console.log('Starting navbar and footer updates...\n');
  
  let updatedCount = 0;
  let skippedCount = 0;
  
  for (const file of PAGES_TO_UPDATE) {
    const filePath = path.join(ROOT, file);
    
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`⚠  File not found: ${file}`);
        skippedCount++;
        continue;
      }
      
      let html = await readFile(filePath);
      const originalHtml = html;
      let changesMade = false;
      
      // Find and replace navbar
      const navbarSection = findNavbarSection(html);
      if (navbarSection) {
        const before = html.substring(0, navbarSection.start);
        const after = html.substring(navbarSection.end);
        html = before + navbarContent.trim() + '\n\n' + after;
        console.log(`✓ Updated navbar in ${file}`);
        changesMade = true;
      } else {
        console.log(`⚠  Could not find navbar section in ${file}`);
      }
      
      // Find and replace footer
      const footerSection = findFooterSection(html);
      if (footerSection) {
        const before = html.substring(0, footerSection.start);
        const after = html.substring(footerSection.end);
        html = before + footerContent.trim() + '\n\n' + after;
        console.log(`✓ Updated footer in ${file}`);
        changesMade = true;
      } else {
        console.log(`⚠  Could not find footer section in ${file}`);
      }
      
      // Only write if we made changes
      if (changesMade) {
        await writeFile(filePath, html);
        updatedCount++;
        console.log(`  → Saved ${file}\n`);
      } else {
        skippedCount++;
        console.log(`  → No changes needed for ${file}\n`);
      }
      
    } catch (error) {
      console.error(`✗ Error updating ${file}:`, error.message);
      skippedCount++;
    }
  }
  
  console.log(`\n✅ Update complete!`);
  console.log(`   Updated: ${updatedCount} pages`);
  console.log(`   Skipped: ${skippedCount} pages`);
  console.log(`\nAll pages now use the global navbar and footer from partials/ directory.`);
}

updatePages().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
