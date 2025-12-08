// Complete fix - removes early returns, adds null checks, wraps event listeners
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

async function fixPage(filePath) {
  try {
    let content = await fs.promises.readFile(filePath, 'utf8');
    let modified = false;
    
    // 1. Remove early return statements (critical fix)
    const earlyReturn1 = content.includes('if (!techTrigger || !techMenu || !techChevron || !techDropdown) return;');
    const earlyReturn2 = content.includes('if (!companyTrigger || !companyMenu || !companyChevron || !companyDropdown) return;');
    
    if (earlyReturn1 || earlyReturn2) {
      // Remove line by line using split/join
      const lines = content.split('\n');
      const newLines = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('if (!techTrigger || !techMenu || !techChevron || !techDropdown) return;')) {
          continue; // Skip this line
        }
        if (line.includes('if (!companyTrigger || !companyMenu || !companyChevron || !companyDropdown) return;')) {
          continue; // Skip this line
        }
        newLines.push(line);
      }
      content = newLines.join('\n');
      modified = true;
    }
    
    // 2. Add null checks to openTechMenu
    if (!content.includes('function openTechMenu() {')) {
      console.log(`  ⚠️  openTechMenu function not found`);
    } else if (!content.match(/function openTechMenu\(\) \{[\s\S]*?if \(!techMenu \|\| !techChevron\) return;/)) {
      content = content.replace(
        /(function openTechMenu\(\) \{)(\s*positionDropdown\(techMenu\);)/,
        '$1\n        if (!techMenu || !techChevron) return;$2'
      );
      modified = true;
    }
    
    // 3. Add null checks to closeTechMenu
    if (!content.match(/function closeTechMenu\(\) \{[\s\S]*?if \(!techMenu \|\| !techChevron\) return;/)) {
      content = content.replace(
        /(function closeTechMenu\(\) \{)(\s*\/\/ Start closing animation)/,
        '$1\n        if (!techMenu || !techChevron) return;$2'
      );
      modified = true;
    }
    
    // 4. Add null checks to openCompanyMenu
    if (!content.match(/function openCompanyMenu\(\) \{[\s\S]*?if \(!companyMenu \|\| !companyChevron\) return;/)) {
      content = content.replace(
        /(function openCompanyMenu\(\) \{)(\s*positionDropdown\(companyMenu\);)/,
        '$1\n        if (!companyMenu || !companyChevron) return;$2'
      );
      modified = true;
    }
    
    // 5. Add null checks to closeCompanyMenu
    if (!content.match(/function closeCompanyMenu\(\) \{[\s\S]*?if \(!companyMenu \|\| !companyChevron\) return;/)) {
      content = content.replace(
        /(function closeCompanyMenu\(\) \{)(\s*\/\/ Start closing animation)/,
        '$1\n        if (!companyMenu || !companyChevron) return;$2'
      );
      modified = true;
    }
    
    // 6. Wrap event listeners in conditionals
    if (content.includes("// Tech dropdown events") && !content.includes("// Tech dropdown events - only attach if elements exist")) {
      // Replace the event listener section
      const techEventsPattern = /(\/\/ Tech dropdown events\s+)(techDropdown\.addEventListener\('mouseenter', openTechMenu\);[\s\S]*?}\);\s+)/;
      const techEventsMatch = content.match(techEventsPattern);
      
      if (techEventsMatch) {
        const wrappedTechEvents = `      // Tech dropdown events - only attach if elements exist
      if (techDropdown && techTrigger && techMenu && techChevron) {
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
      }

`;
        content = content.replace(techEventsPattern, wrappedTechEvents);
        modified = true;
      }
    }
    
    if (content.includes("// Company dropdown events") && !content.includes("// Company dropdown events - only attach if elements exist")) {
      const companyEventsPattern = /(\/\/ Company dropdown events\s+)(companyDropdown\.addEventListener\('mouseenter', openCompanyMenu\);[\s\S]*?}\);\s+)/;
      const companyEventsMatch = content.match(companyEventsPattern);
      
      if (companyEventsMatch) {
        const wrappedCompanyEvents = `      // Company dropdown events - only attach if elements exist
      if (companyDropdown && companyTrigger && companyMenu && companyChevron) {
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
      }

`;
        content = content.replace(companyEventsPattern, wrappedCompanyEvents);
        modified = true;
      }
    }
    
    if (modified) {
      await fs.promises.writeFile(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    } else {
      console.log(`⏭️  No changes: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error: ${filePath}`, error.message);
    return false;
  }
}

async function main() {
  console.log('Applying complete dropdown fixes...\n');
  let success = 0;
  for (const page of PAGES) {
    const filePath = path.join(ROOT, page);
    if (fs.existsSync(filePath)) {
      if (await fixPage(filePath)) success++;
    }
  }
  console.log(`\n✨ Fixed ${success} files.`);
}

main().catch(console.error);

