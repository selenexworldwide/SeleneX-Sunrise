import os
import glob

def fix_research_links(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Determine the depth of the file from the root
        rel_path = os.path.relpath(filepath, 'd:/SeleneX')
        depth = rel_path.count(os.sep)
        
        # For files in subdirectories, need ../ prefix
        if depth > 0:
            prefix = '../' * depth
            content = content.replace('href="#research"', f'href="{prefix}research.html"')
        else:
            content = content.replace('href="#research"', 'href="research.html"')
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed: {filepath}")
        else:
            print(f"No changes: {filepath}")
    except Exception as e:
        print(f"Error {filepath}: {e}")

# Fix all HTML files
files = glob.glob('d:/SeleneX/**/*.html', recursive=True)
for f in files:
    fix_research_links(f)

print(f"\nProcessed {len(files)} files")
