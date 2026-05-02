import re

with open('src/app/page.tsx', 'r', encoding='utf-8-sig') as f:
    content = f.read()

changes = []

# 1. Fix skeleton loader avatar — remove hardcoded gradient div, use skeleton-shimmer
old = '<div style={{ width: 44, height: 44, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, rgba(201,148,90,0.12), rgba(201,148,90,0.04))", border: "1.5px solid var(--border)" }} />'
new = '<div className="skeleton-shimmer" style={{ width: 44, height: 44, borderRadius: "50%" }} />'
if old in content:
    content = content.replace(old, new)
    changes.append('skeleton-avatar')
else:
    changes.append('skeleton-avatar: NOT FOUND')

# 2. Opportunity card hover: translateY(-3px) -> -2px
count = len(re.findall(r'translateY\(-3px\)', content))
content = re.sub(r'translateY\(-3px\)', 'translateY(-2px)', content)
changes.append(f'opp-card-hover: {count} replacements')

# 3. NetworkCard hover — add box-shadow to the onMouseEnter that only has borderColor
# Pattern: only has borderColor set, no boxShadow yet
old_nw = 'onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent-border)"; }}\n    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--card-border)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}'
new_nw = 'onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent-border)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 1px var(--accent-border), 0 4px 16px rgba(0,0,0,0.3)"; }}\n    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--card-border)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}'
if old_nw in content:
    content = content.replace(old_nw, new_nw)
    changes.append('networkcard-shadow')
else:
    changes.append('networkcard-shadow: NOT FOUND')

print('Changes:', changes)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)