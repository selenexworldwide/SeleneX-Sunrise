// Script to replace all inline footers with the footer partial
// Usage: node update-footers.js

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const FOOTER_PARTIAL = path.join(ROOT, 'partials', 'footer.html');

// Files to update
const FILES_TO_UPDATE = [
  'company/about.html',
  'company/contact.html',
  'company/team.html',
  'company/careers.html',
  'company/partnerships.html',
  'company/why-armenia.html',
  'technology/technology.html',
  'technology/ethics-security.html',
  'terms/privacy-policy.html',
  'terms/terms-service.html',
  'research.html',
  'selenex-landing.html'
];

async function readFile(p) {
  return fs.promises.readFile(p, 'utf8');
}

async function writeFile(p, content) {
  await fs.promises.writeFile(p, content, 'utf8');
}

function findFooterSection(html) {
  // Find the footer section starting from the comment (try both comment formats)
  let startIndex = html.indexOf('<!-- Shared SeleneX footer used across all pages -->');
  
  if (startIndex === -1) {
    // Try alternative comment format
    startIndex = html.indexOf('<!-- Footer -->');
  }
  
  if (startIndex === -1) {
    return null;
  }
  
  // Find the end - look for </footer> followed by </div> with footer-white-wrapper
  // We need to find the closing </footer> and then the closing </div> of footer-white-wrapper
  let searchIndex = startIndex;
  let footerCloseIndex = -1;
  let wrapperCloseIndex = -1;
  
  // Find </footer>
  footerCloseIndex = html.indexOf('</footer>', searchIndex);
  if (footerCloseIndex === -1) {
    return null;
  }
  
  // Find the closing </div> after </footer> (this should be the footer-white-wrapper closing tag)
  // Look for </div> that comes after </footer> and before the next major section (like <script>)
  wrapperCloseIndex = html.indexOf('</div>', footerCloseIndex + '</footer>'.length);
  
  // Make sure we're not grabbing a div that's too far away (check for script tag)
  const scriptIndex = html.indexOf('<script>', footerCloseIndex);
  if (scriptIndex !== -1 && wrapperCloseIndex > scriptIndex) {
    // The </div> we found is after script, so look backwards
    // Actually, let's just find the first </div> after </footer> and before any <script>
    const tempIndex = html.lastIndexOf('</div>', scriptIndex);
    if (tempIndex > footerCloseIndex) {
      wrapperCloseIndex = tempIndex;
    }
  }
  
  if (wrapperCloseIndex === -1) {
    // Try to find it by looking for the pattern more carefully
    // The structure should be: </footer>\n  </div>
    const pattern = html.substring(footerCloseIndex, footerCloseIndex + 50);
    const divMatch = pattern.match(/<\/footer>\s*<\/div>/);
    if (divMatch) {
      wrapperCloseIndex = footerCloseIndex + divMatch.index + divMatch[0].length;
    } else {
      // Fallback: just use </footer> + 10 characters (should cover the closing div)
      wrapperCloseIndex = footerCloseIndex + '</footer>'.length + 10;
    }
  } else {
    wrapperCloseIndex += '</div>'.length;
  }
  
  return {
    start: startIndex,
    end: wrapperCloseIndex
  };
}

async function updateFooters() {
  const footerContent = await readFile(FOOTER_PARTIAL);
  
  console.log('Starting footer update...\n');
  
  for (const file of FILES_TO_UPDATE) {
    const filePath = path.join(ROOT, file);
    
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`⚠ File not found: ${file}`);
        continue;
      }
      
      let html = await readFile(filePath);
      const footerSection = findFooterSection(html);
      
      if (footerSection) {
        const before = html.substring(0, footerSection.start);
        const after = html.substring(footerSection.end);
        html = before + footerContent.trim() + '\n\n' + after;
        
        await writeFile(filePath, html);
        console.log(`✓ Updated ${file}`);
      } else {
        console.log(`⚠ Could not find footer section in ${file}`);
      }
    } catch (error) {
      console.error(`✗ Error updating ${file}:`, error.message);
    }
  }
  
  console.log('\n✅ Footer update complete!');
  console.log('All pages now use the footer from partials/footer.html');
}

updateFooters().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
