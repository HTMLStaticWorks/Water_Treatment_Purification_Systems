import glob
import re

files = glob.glob('*.html')

pattern = re.compile(
    r'<li class="d-flex align-items-center gap-2">\s*<i data-lucide="check"[^>]*></i>\s*<strong>(.*?)</strong>(.*?)</li>',
    re.DOTALL
)

def repl(match):
    return f'<li class="d-flex align-items-start gap-2">\n  <i data-lucide="check" class="text-info mt-1" style="min-width: 20px;"></i>\n  <span><strong>{match.group(1)}</strong>{match.group(2)}</span>\n</li>'

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    new_content, count = pattern.subn(repl, content)
    if count > 0:
        print(f"Fixed {count} instances in {f}")
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
