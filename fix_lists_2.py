import glob
import re

files = glob.glob('*.html')

# Find <li class="d-flex align-items-center gap-2"> followed by <i ...></i>
pattern = re.compile(
    r'<li class="d-flex align-items-center gap-2">\s*(<i[^>]+></i>)\s*(.*?)\s*</li>',
    re.DOTALL
)

def repl(match):
    icon_tag = match.group(1)
    # Add mt-1 and min-width to icon
    if 'class="' in icon_tag:
        icon_tag = icon_tag.replace('class="', 'class="mt-1 ')
    else:
        icon_tag = icon_tag.replace('<i ', '<i class="mt-1" ')
    
    # We put the icon in a container? Actually, just style="min-width: 24px;" is enough
    if 'style="' in icon_tag:
        icon_tag = icon_tag.replace('style="', 'style="min-width: 24px; ')
    else:
        icon_tag = icon_tag.replace('<i ', '<i style="min-width: 24px;" ')

    content = match.group(2)
    
    return f'<li class="d-flex align-items-start gap-2">\n  {icon_tag}\n  <div>{content}</div>\n</li>'

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    new_content, count = pattern.subn(repl, content)
    if count > 0:
        print(f"Fixed {count} instances in {f}")
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
