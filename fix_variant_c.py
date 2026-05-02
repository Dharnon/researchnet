import codecs
content = codecs.open(r'C:\Users\josei\researchnet\src\app\page.tsx', 'r', encoding='utf-8').read()
content = content.replace('translateY(-3px)', 'translateY(-2px)')
codecs.open(r'C:\Users\josei\researchnet\src\app\page.tsx', 'w', encoding='utf-8').write(content)
print('done')
