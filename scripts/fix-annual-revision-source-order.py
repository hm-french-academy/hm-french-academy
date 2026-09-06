from pathlib import Path

p = Path('annual-revision-stage.html')
s = p.read_text(encoding='utf-8')
old = "for(const u of ['https://raw.githubusercontent.com/hm-french-academy/hm-french-academy/main/'+p,'https://api.github.com/repos/hm-french-academy/hm-french-academy/contents/'+p,'./'+p])"
new = "for(const u of ['./'+p,'https://raw.githubusercontent.com/hm-french-academy/hm-french-academy/main/'+p,'https://api.github.com/repos/hm-french-academy/hm-french-academy/contents/'+p])"
if old not in s:
    raise SystemExit('Could not locate annual revision data source order')
s = s.replace(old, new, 1)
# The production Pages copy is enriched during the workflow; always prefer that local copy
# so Grade 4 source-specific explanations are actually consumed by the deployed page.
p.write_text(s, encoding='utf-8')
print('Annual revision: production-local data source is now preferred before GitHub fallbacks')
