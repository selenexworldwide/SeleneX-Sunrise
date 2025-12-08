// Remove the blocking early returns from all pages
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

async function removeEarlyReturns(filePath) {
  try {
    let content = await fs.promises.readFile(filePath, 'utf8');
    
    // Remove the two early return lines
    content = content.replace(
      /\s+if \(!techTrigger \|\| !techMenu \|\| !techChevron \|\| !techDropdown\) return;\s*\n\s*if \(!companyTrigger \|\| !companyMenu \|\| !companyChevron \|\| !companyDropdown\) return;\s*\n/g,
      '\n'
    );
    
    await fs.promises.writeFile(filePath, content, 'utf8');
    console.log(`✅ Removed early returns from ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error: ${filePath}`, error.message);
    return false;
  }
}

async function main() {
  console.log('Removing blocking early returns...\n');
  let success = 0;
  for (const page of PAGES) {
    const filePath = path.join(ROOT, page);
    if (fs.existsSync(filePath)) {
      if (await removeEarlyReturns(filePath)) success++;
    }
  }
  console.log(`\n✨ Removed early returns from ${success} files.`);
}

main().catch(console.error);

