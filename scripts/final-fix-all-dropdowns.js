const fs = require('fs');

const files = [
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

files.forEach(file => {
  console.log(`Fixing ${file}...`);
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove the if wrapper around tech dropdown
  content = content.replace(
    /if \(techDropdown && techTrigger && techMenu && techChevron\) \{[\s\n]*/g,
    ''
  );
  content = content.replace(
    /techDropdown\.addEventListener\('mouseenter', openTechMenu\);[\s\n]*techDropdown\.addEventListener\('mouseleave', closeTechMenu\);[\s\n]*techTrigger\.addEventListener\('click', function \(e\) \{[\s\n]*e\.preventDefault\(\);[\s\n]*if \(techMenu\.classList\.contains\('opacity-0'\)\) \{[\s\n]*openTechMenu\(\);[\s\n]*\} else \{[\s\n]*closeTechMenu\(\);[\s\n]*\}[\s\n]*\}\);[\s\n]*\}/g,
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
  
  // Remove the if wrapper around company dropdown
  content = content.replace(
    /if \(companyDropdown && companyTrigger && companyMenu && companyChevron\) \{[\s\n]*/g,
    ''
  );
  content = content.replace(
    /companyDropdown\.addEventListener\('mouseenter', openCompanyMenu\);[\s\n]*companyDropdown\.addEventListener\('mouseleave', closeCompanyMenu\);[\s\n]*companyTrigger\.addEventListener\('click', function \(e\) \{[\s\n]*e\.preventDefault\(\);[\s\n]*if \(companyMenu\.classList\.contains\('opacity-0'\)\) \{[\s\n]*openCompanyMenu\(\);[\s\n]*\} else \{[\s\n]*closeCompanyMenu\(\);[\s\n]*\}[\s\n]*\}\);[\s\n]*\}/g,
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
  
  // Fix click outside handlers
  content = content.replace(/if \(techDropdown && !techDropdown\.contains\(e\.target\)\)/g, 'if (!techDropdown.contains(e.target))');
  content = content.replace(/if \(companyDropdown && !companyDropdown\.contains\(e\.target\)\)/g, 'if (!companyDropdown.contains(e.target))');
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`  ✓ Fixed ${file}`);
});

console.log('\nDone! All files have been fixed.');

