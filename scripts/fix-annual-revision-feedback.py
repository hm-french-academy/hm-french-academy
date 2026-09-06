from pathlib import Path

p = Path('annual-revision-stage.html')
s = p.read_text(encoding='utf-8')

# Patch the runtime so feedback is resolved from the actual question object/id,
# never from the question's shuffled visual position.
old = "const q=arr[i]||{},selected=box.querySelector('input:checked');const correct=!!selected&&Number(selected.value)===Number(q.answer);"
new = "const q=arr.find(x=>String(x?.id||'')===String(box.dataset.questionId||''))||arr[i]||{},selected=box.querySelector('input:checked');const correct=!!selected&&Number(selected.value)===Number(q.answer);"
if old in s:
    s = s.replace(old, new, 1)

# Ensure each rendered question carries its stable question id on its container.
needle = "<div class=\"q\">"
if needle in s and 'data-question-id' not in s:
    s = s.replace(needle, "<div class=\"q\" data-question-id=\"'+esc(q.id||'')+'\">", 1)

p.write_text(s, encoding='utf-8')
print('annual revision feedback question-id binding applied')
