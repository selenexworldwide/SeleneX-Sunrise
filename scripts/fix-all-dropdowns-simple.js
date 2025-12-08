const fs = require('fs');

const filesToFix = [
  'company/about.html',
  'company/team.html',
  'company/why-armenia.html',
  'company/partnerships.html',
  'technology/technology.html',
  'technology/ethics-security.html',
  'terms/terms-service.html',
  'terms/privacy-policy.html',
  'research.html'
];

function fixFile(filePath) {
  console.log(`Fixing: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Fix tech dropdown - remove null check wrapper
  content = content.replace(
    /\/\/ Tech dropdown events[^\n]*\n\s*if \(techDropdown && techTrigger && techMenu && techChevron\) \{/g,
    '// Tech dropdown events'
  );
  
  content = content.replace(
    /techDropdown\.addEventListener\('mouseenter', openTechMenu\);[\s\S]*?techDropdown\.addEventListener\('mouseleave', closeTechMenu\);[\s\S]*?techTrigger\.addEventListener\('click', function \(e\) \{[\s\S]*?e\.preventDefault\(\);[\s\S]*?if \(techMenu\.classList\.contains\('opacity-0'\)\) \{[\s\S]*?openTechMenu\(\);[\s\S]*?\} else \{[\s\S]*?closeTechMenu\(\);[\s\S]*?\}[\s\S]*?\}\);[\s\S]*?\s+\}/g,
    `techDropdown.addEventListener('mouseenter', openTechMenu);
      techDropdown.addEventListener('mouseleave', closeTechMenu);
      techTrigger.addEventListener('click', function (e) {
        e.preventDefault();
        if (techMenu.classList.contains('opacity-0')) {
          openTechMenu();
        } else {
          closeTechMenu();
        }
      });`
  );
  
  // Fix company dropdown - remove null check wrapper
  content = content.replace(
    /\/\/ Company dropdown events[^\n]*\n\s*if \(companyDropdown && companyTrigger && companyMenu && companyChevron\) \{/g,
    '// Company dropdown events'
  );
  
  content = content.replace(
    /companyDropdown\.addEventListener\('mouseenter', openCompanyMenu\);[\s\S]*?companyDropdown\.addEventListener\('mouseleave', closeCompanyMenu\);[\s\S]*?companyTrigger\.addEventListener\('click', function \(e\) \{[\s\S]*?e\.preventDefault\(\);[\s\S]*?if \(companyMenu\.classList\.contains\('opacity-0'\)\) \{[\s\S]*?openCompanyMenu\(\);[\s\S]*?\} else \{[\s\S]*?closeCompanyMenu\(\);[\s\S]*?\}[\s\S]*?\}\);[\s\S]*?\s+\}/g,
    `companyDropdown.addEventListener('mouseenter', openCompanyMenu);
      companyDropdown.addEventListener('mouseleave', closeCompanyMenu);
      companyTrigger.addEventListener('click', function (e) {
        e.preventDefault();
        if (companyMenu.classList.contains('opacity-0')) {
          openCompanyMenu();
        } else {
          closeCompanyMenu();
        }
      });`
  );
  
  // Fix click outside handler
  content = content.replace(
    /if \(techDropdown && !techDropdown\.contains\(e\.target\)\)/g,
    'if (!techDropdown.contains(e.target))'
  );
  
  content = content.replace(
    /if \(companyDropdown && !companyDropdown\.contains\(e\.target\)\)/g,
    'if (!companyDropdown.contains(e.target))'
  );
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Fixed ${filePath}\n`);
    return true;
  } else {
    console.log(`  - No changes needed\n`);
    return false;
  }
}

console.log('Fixing dropdown event listeners...\n');
let fixedCount = 0;

filesToFix.forEach(file => {
  try {
    if (fixFile(file)) {
      fixedCount++;
    }
  } catch (error) {
    console.error(`  ✗ Error fixing ${file}:`, error.message);
  }
});

console.log(`Done! Fixed ${fixedCount} files.`);

