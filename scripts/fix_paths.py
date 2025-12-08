import os
import glob

def fix_paths(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Determine the depth of the file from the root
        rel_path = os.path.relpath(filepath, 'd:/SeleneX')
        depth = rel_path.count(os.sep)
        
        # For files in subdirectories, we need to add ../ prefix
        if depth > 0:
            prefix = '../' * depth
            
            # Fix hrefs that don't have proper relative paths
            # Links that should go to root-level files
            content = content.replace('href="technology/', f'href="{prefix}technology/')
            content = content.replace('href="company/', f'href="{prefix}company/')
            content = content.replace('href="research.html', f'href="{prefix}research.html')
            content = content.replace('href="assets/', f'href="{prefix}assets/')
            content = content.replace('href="terms/', f'href="{prefix}terms/')
            content = content.replace('href="partials/', f'href="{prefix}partials/')
            content = content.replace('href="selenex-landing.html', f'href="{prefix}selenex-landing.html')
            
            # Also fix src attributes for images
            # But only if they don't already have ../
            if '../assets/' not in content:
                content = content.replace('src="assets/', f'src="{prefix}assets/')
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed: {filepath} (depth={depth})")
        else:
            print(f"No changes: {filepath}")
    except Exception as e:
        print(f"Error {filepath}: {e}")

# Only fix files in subdirectories (company/, technology/, terms/)
subdirs = ['company', 'technology', 'terms', 'partials']
for subdir in subdirs:
    pattern = f'd:/SeleneX/{subdir}/*.html'
    files = glob.glob(pattern)
    for f in files:
        fix_paths(f)

print("\nDone!")
