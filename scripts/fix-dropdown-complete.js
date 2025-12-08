// Complete fix for dropdown JavaScript - removes early returns, adds null checks, cleans duplicates
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

const PAGES = [
  'company/contact.html',
  'company/partnerships.html',
  'company/team.html',
  'company/why-armenia.html',
  'company/careers.html',
  'technology/ethics-security.html',
  'technology/technology.html',
  'terms/privacy-policy.html',
  'terms/terms-service.html',
  'research.html',
];

async function fixPage(pagePath) {
  try {
    let content = await fs.promises.readFile(pagePath, 'utf8');
    let modified = false;

    // 1. Remove early return statements that block all functionality
    const earlyReturnPattern1 = /(\s+)(if \(!techTrigger \|\| !techMenu \|\| !techChevron \|\| !techDropdown\) return;\s*)/;
    const earlyReturnPattern2 = /(\s+)(if \(!companyTrigger \|\| !companyMenu \|\| !companyChevron \|\| !companyDropdown\) return;\s*)/;
    
    if (content.match(earlyReturnPattern1)) {
      content = content.replace(earlyReturnPattern1, '$1');
      modified = true;
      console.log(`  ✓ Removed early return 1`);
    }
    if (content.match(earlyReturnPattern2)) {
      content = content.replace(earlyReturnPattern2, '$1');
      modified = true;
      console.log(`  ✓ Removed early return 2`);
    }

    // 2. Add null checks inside openTechMenu function
    const openTechPattern = /(function openTechMenu\(\) \{)(\s*positionDropdown\(techMenu\);)/;
    if (content.match(openTechPattern)) {
      content = content.replace(openTechPattern, '$1\n        if (!techMenu || !techChevron) return;$2');
      modified = true;
      console.log(`  ✓ Added null checks to openTechMenu`);
    }

    // 3. Add null checks inside closeTechMenu function
    const closeTechPattern = /(function closeTechMenu\(\) \{)(\s*\/\/ Start closing animation)/;
    if (content.match(closeTechPattern)) {
      content = content.replace(closeTechPattern, '$1\n        if (!techMenu || !techChevron) return;$2');
      modified = true;
      console.log(`  ✓ Added null checks to closeTechMenu`);
    }

    // 4. Add null checks inside openCompanyMenu function
    const openCompanyPattern = /(function openCompanyMenu\(\) \{)(\s*positionDropdown\(companyMenu\);)/;
    if (content.match(openCompanyPattern)) {
      content = content.replace(openCompanyPattern, '$1\n        if (!companyMenu || !companyChevron) return;$2');
      modified = true;
      console.log(`  ✓ Added null checks to openCompanyMenu`);
    }

    // 5. Add null checks inside closeCompanyMenu function
    const closeCompanyPattern = /(function closeCompanyMenu\(\) \{)(\s*\/\/ Start closing animation)/;
    if (content.match(closeCompanyPattern)) {
      content = content.replace(closeCompanyPattern, '$1\n        if (!companyMenu || !companyChevron) return;$2');
      modified = true;
      console.log(`  ✓ Added null checks to closeCompanyMenu`);
    }

    // 6. Wrap event listeners in conditional checks
    const eventListenerPattern = /(\/\/ Tech dropdown events\s*)(techDropdown\.addEventListener\('mouseenter', openTechMenu\);)/;
    if (content.match(eventListenerPattern) && !content.includes('// Tech dropdown events - only attach if elements exist')) {
      const before = content.substring(0, content.indexOf('// Tech dropdown events'));
      const after = content.substring(content.indexOf('techDropdown.addEventListener'));
      const eventsEnd = after.indexOf('// Company dropdown events');
      const techEvents = after.substring(0, eventsEnd);
      const companyEventsStart = after.substring(eventsEnd);
      const companyEventsEnd = companyEventsStart.indexOf('\n      });\n\n      // Close menus when clicking outside');
      const companyEvents = companyEventsStart.substring(0, companyEventsEnd);
      const rest = companyEventsStart.substring(companyEventsEnd);
      
      const wrappedTechEvents = `      // Tech dropdown events - only attach if elements exist
      if (techDropdown && techTrigger && techMenu && techChevron) {
${techEvents.trim().replace(/^/gm, '        ')}
      }

`;
      
      const wrappedCompanyEvents = `      // Company dropdown events - only attach if elements exist
      if (companyDropdown && companyTrigger && companyMenu && companyChevron) {
${companyEvents.trim().replace(/^/gm, '        ')}
      }

`;
      
      content = before + wrappedTechEvents + wrappedCompanyEvents + rest;
      modified = true;
      console.log(`  ✓ Wrapped event listeners in conditionals`);
    }

    // 7. Remove orphaned duplicate code (lines 1615-1647 and duplicate toggleAccordion)
    // Remove the orphaned toggleMobileMenu inside a closing brace
    const orphanedPattern = /(\s+function toggleAccordion\(contentId, chevronId\) \{[\s\S]*?\}\s+)(\s+function toggleMobileMenu\(\) \{[\s\S]*?if \(mobileMenuBtn\) \{[\s\S]*?\}\);\s+\}\s+)(\/\/ Mobile accordion functionality\s+function toggleAccordion)/;
    if (content.match(orphanedPattern)) {
      content = content.replace(orphanedPattern, '$1$3');
      modified = true;
      console.log(`  ✓ Removed orphaned duplicate code`);
    }

    // 8. Remove duplicate toggleAccordion at the end
    const duplicateAccordion = /(\/\/ Mobile accordion functionality\s+function toggleAccordion\(contentId, chevronId\) \{[\s\S]*?\}\s+)(\/\/ Mobile accordion functionality\s+function toggleAccordion\(contentId, chevronId\) \{[\s\S]*?\})/;
    if (content.match(duplicateAccordion)) {
      content = content.replace(duplicateAccordion, '$1');
      modified = true;
      console.log(`  ✓ Removed duplicate toggleAccordion`);
    }

    if (modified) {
      await fs.promises.writeFile(pagePath, content, 'utf8');
      console.log(`✅ Fixed: ${pagePath}\n`);
      return true;
    } else {
      console.log(`⏭️  No changes needed: ${pagePath}\n`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error fixing ${pagePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('Fixing dropdown JavaScript on all pages...\n');
  
  let success = 0;
  for (const page of PAGES) {
    const filePath = path.join(ROOT, page);
    if (fs.existsSync(filePath)) {
      if (await fixPage(filePath)) success++;
    } else {
      console.log(`⚠️  File not found: ${page}\n`);
    }
  }
  
  console.log(`\n✨ Fixed ${success} files.`);
}

main().catch(console.error);

