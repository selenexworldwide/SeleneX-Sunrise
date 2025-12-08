// Simple static build script to assemble pages from shared navbar/footer partials.
// Usage: node build.js
// Only builds pages from templates/ directory and skips completed pages.

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PARTIALS_DIR = path.join(ROOT, 'partials');
const TEMPLATES_DIR = path.join(ROOT, 'templates');
const OUT_DIR = ROOT; // write final .html into project root / subfolders

const NAV_MARKER = '{{NAVBAR}}';
const FOOTER_MARKER = '{{FOOTER}}';

// Files that should NEVER be rebuilt (completed pages)
const SKIP_FILES = [
  'selenex-landing.html',
];

async function readFile(p) {
  return fs.promises.readFile(p, 'utf8');
}

async function fileExists(p) {
  try {
    await fs.promises.access(p);
    return true;
  } catch {
    return false;
  }
}

async function writeFile(p, content) {
  await fs.promises.mkdir(path.dirname(p), { recursive: true });
  await fs.promises.writeFile(p, content, 'utf8');
}

async function build() {
  const navbar = await readFile(path.join(PARTIALS_DIR, 'navbar.html'));
  const footer = await readFile(path.join(PARTIALS_DIR, 'footer.html'));

  async function walkTemplates(dir) {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walkTemplates(full);
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        const relFromTemplates = path.relative(TEMPLATES_DIR, full);
        const outPath = path.join(OUT_DIR, relFromTemplates);
        const fileName = entry.name;

        // Skip files in the skip list
        if (SKIP_FILES.includes(fileName)) {
          console.log('⏭  Skipped (protected):', relFromTemplates);
          continue;
        }

        // Check if output file exists
        const outputExists = await fileExists(outPath);
        
        if (outputExists) {
          // If file exists, check if it has markers (needs rebuilding)
          // or if it's a completed page (shouldn't be touched)
          try {
            const existingContent = await readFile(outPath);
            
            // If the existing file doesn't have markers, it's a completed page - skip it
            if (!existingContent.includes(NAV_MARKER) && !existingContent.includes(FOOTER_MARKER)) {
              console.log('⏭  Skipped (completed page):', relFromTemplates);
              continue;
            }
          } catch (err) {
            console.warn('⚠  Warning: Could not read existing file, will overwrite:', relFromTemplates);
          }
        }

        // Build the page from template
        let html = await readFile(full);
        html = html.replace(NAV_MARKER, navbar).replace(FOOTER_MARKER, footer);

        await writeFile(outPath, html);
        console.log('✓ Built', relFromTemplates, '→', path.relative(ROOT, outPath));
      }
    }
  }

  await walkTemplates(TEMPLATES_DIR);
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});







