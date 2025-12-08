// Simple script to remove the blocking early return lines
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

async function fixFile(filePath) {
  try {
    let content = await fs.promises.readFile(filePath, 'utf8');
    const lines = content.split('\n');
    const newLines = [];
    let removed = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Skip the two early return lines
      if (line.includes('if (!techTrigger || !techMenu || !techChevron || !techDropdown) return;')) {
        removed++;
        continue;
      }
      if (line.includes('if (!companyTrigger || !companyMenu || !companyChevron || !companyDropdown) return;')) {
        removed++;
        continue;
      }
      newLines.push(line);
    }
    
    if (removed > 0) {
      await fs.promises.writeFile(filePath, newLines.join('\n'), 'utf8');
      console.log(`✅ Removed ${removed} early return(s) from ${filePath}`);
      return true;
    } else {
      console.log(`⏭️  No early returns found in ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('Removing blocking early returns from all pages...\n');
  let success = 0;
  for (const page of PAGES) {
    const filePath = path.join(ROOT, page);
    if (fs.existsSync(filePath)) {
      if (await fixFile(filePath)) success++;
    }
  }
  console.log(`\n✨ Fixed ${success} files.`);
}

main().catch(console.error);

