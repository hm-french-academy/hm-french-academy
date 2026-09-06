from pathlib import Path

p = Path('annual-revision-stage.html')
s = p.read_text(encoding='utf-8')

old = "const q=arr[i]||{},selected=box.querySelector('input:checked');const correct=!!selected&&Number(selected.value)===Number(q.answer);"
new = "const selected=box.querySelector('input:checked'),probe=box.querySelector('input[name]'),name=String((selected||probe)?.name||''),m=name.match(/(?:^|[-_])(D|P|F)\\d+$/),questionId=m?m[0].replace(/^[-_]/,''):'';const q=arr.find(x=>String(x?.id||'')===questionId)||arr[i]||{};const correct=!!selected&&Number(selected.value)===Number(q.answer);"
if old not in s:
    raise SystemExit('annual-revision-stage.html: expected positional grading code not found')
s = s.replace(old, new, 1)

old_diag = "const n=score(diag,'diag');localStorage.setItem(key,JSON.stringify({version:1,target:g,score:n,total:diag.length,completedAt:new Date().toISOString()}));location.reload()"
new_diag = "const n=grade(diag,'diag','diagResult');localStorage.setItem(key,JSON.stringify({version:1,target:g,score:n,total:diag.length,completedAt:new Date().toISOString()}));$('diagBtn').disabled=true"
if old_diag in s:
    s = s.replace(old_diag, new_diag, 1)

p.write_text(s, encoding='utf-8')
print('annual revision grading now binds feedback/correction to question IDs')
