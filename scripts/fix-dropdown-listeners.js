const fs = require('fs');

const filesToFix = [
  'company/contact.html',
  'company/about.html',
  'company/why-armenia.html',
  'company/team.html',
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
  let modified = false;
  
  // Remove null checks from tech dropdown event listeners
  const techPattern = /if \(techDropdown && techTrigger && techMenu && techChevron\) \{[\s\S]*?techDropdown\.addEventListener\('mouseenter', openTechMenu);[\s\S]*?techDropdown\.addEventListener\('mouseleave', closeTechMenu);[\s\S]*?techTrigger\.addEventListener\('click', function \(e\) \{[\s\S]*?e\.preventDefault\(\);[\s\S]*?if \(techMenu\.classList\.contains\('opacity-0'\)\) \{[\s\S]*?openTechMenu\(\);[\s\S]*?\} else \{[\s\S]*?closeTechMenu\(\);[\s\S]*?\}[\s\S]*?\}\);[\s\S]*?\}/;
  
  if (techPattern.test(content)) {
    content = content.replace(
      techPattern,
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
    modified = true;
    console.log(`  ✓ Fixed tech dropdown listeners`);
  }
  
  // Remove null checks from company dropdown event listeners
  const companyPattern = /if \(companyDropdown && companyTrigger && companyMenu && companyChevron\) \{[\s\S]*?companyDropdown\.addEventListener\('mouseenter', openCompanyMenu);[\s\S]*?companyDropdown\.addEventListener\('mouseleave', closeCompanyMenu);[\s\S]*?companyTrigger\.addEventListener\('click', function \(e\) \{[\s\S]*?e\.preventDefault\(\);[\s\S]*?if \(companyMenu\.classList\.contains\('opacity-0'\)\) \{[\s\S]*?openCompanyMenu\(\);[\s\S]*?\} else \{[\s\S]*?closeCompanyMenu\(\);[\s\S]*?\}[\s\S]*?\}\);[\s\S]*?\}/;
  
  if (companyPattern.test(content)) {
    content = content.replace(
      companyPattern,
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
    modified = true;
    console.log(`  ✓ Fixed company dropdown listeners`);
  }
  
  // Fix click outside handler
  const clickOutsidePattern = /if \(techDropdown && !techDropdown\.contains\(e\.target\)\) \{[\s\S]*?closeTechMenu\(\);[\s\S]*?\}[\s\S]*?if \(companyDropdown && !companyDropdown\.contains\(e\.target\)\) \{[\s\S]*?closeCompanyMenu\(\);[\s\S]*?\}/;
  
  if (clickOutsidePattern.test(content)) {
    content = content.replace(
      clickOutsidePattern,
      `if (!techDropdown.contains(e.target)) {
          closeTechMenu();
        }
        if (!companyDropdown.contains(e.target)) {
          closeCompanyMenu();
        }`
    );
    modified = true;
    console.log(`  ✓ Fixed click outside handler`);
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Saved ${filePath}\n`);
    return true;
  } else {
    console.log(`  - No changes needed\n`);
    return false;
  }
}

console.log('Fixing dropdown event listeners in all pages...\n');
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

