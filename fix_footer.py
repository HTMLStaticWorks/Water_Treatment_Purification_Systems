import glob

files = glob.glob('*.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    if 'class="premium-footer"' in content:
        # replace Quick Links and Resources
        content = content.replace('<div class="col-md-4 col-lg-2">', '<div class="col-md-3 col-lg-2">')
        # replace Newsletter
        content = content.replace('<div class="col-md-4 col-lg-4">', '<div class="col-md-6 col-lg-4">')
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
print('Done!')
