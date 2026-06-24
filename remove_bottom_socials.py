import os
import glob
import re

dir_path = r"c:\Users\prasa\OneDrive\Desktop\SF\june website 2026\Water_Treatment_Purification_Systems"
html_files = glob.glob(os.path.join(dir_path, "*.html"))

pattern = re.compile(
    r'<div class="col-md-4 text-center text-md-end mt-3 mt-md-0">\s*<div class="d-flex gap-3 justify-content-center justify-content-md-end">\s*<a href="#" class="footer-social-link" aria-label="LinkedIn">.*?</a>\s*<a href="#" class="footer-social-link" aria-label="Twitter">.*?</a>\s*<a href="#" class="footer-social-link" aria-label="Github">.*?</a>\s*</div>\s*</div>',
    re.DOTALL
)

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content, count = pattern.subn('', content)
    
    if count > 0:
        print(f"Removed icons from {os.path.basename(file_path)}")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
    else:
        print(f"No match found in {os.path.basename(file_path)}")
