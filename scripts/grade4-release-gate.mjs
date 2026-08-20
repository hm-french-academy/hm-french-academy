import fs from 'node:fs';
const p='data/lessons/grade-4/premium-release-checklist.json';
const c=JSON.parse(fs.readFileSync(p,'utf8'));
const gates=['sourceAudit','contentAudit','runtimeManifest','routeMap','repositoryIngestion','mediaBinding','gamesBinding','progressBinding','finalQa'];
const failed=gates.filter(k=>c[k]!==true);
console.log(`Grade 4 release gates: ${gates.filter(k=>c[k]).length}/${gates.length} passed`);
if(failed.length){console.log('OPEN:',failed.join(', '));process.exit(1)}
console.log('READY FOR RELEASE');
