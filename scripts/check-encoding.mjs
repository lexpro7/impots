import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {join} from 'node:path';
const decoder=new TextDecoder('utf-8',{fatal:true});
let checked=0;
function check(path){
  const content=decoder.decode(readFileSync(path));
  assert.ok(!content.includes('\uFFFD'), `${path}: replacement character found`);
  checked++;
}
function walk(dir){
  for(const entry of readdirSync(dir,{withFileTypes:true})){
    const path=join(dir,entry.name);
    if(entry.isDirectory()) walk(path);
    else if(/\.(html|css|js|mjs|ts|tsx|json|md)$/.test(path)) check(path);
  }
}
for(const file of ['index.html','package.json','tsconfig.json','vite.config.ts','README.md']) check(file);
for(const dir of ['src','scripts','dist']) if(existsSync(dir)) walk(dir);
for(const file of ['index.html','dist/index.html']){
  if(!existsSync(file))continue;
  const html=decoder.decode(readFileSync(file));
  assert.match(html,/<title>Les Impots - Swiss Tax Trainer<\/title>/);
  assert.match(html,/<meta charset="UTF-8"\s*\/>/i);
}
console.log(`PASS: ${checked} files are valid UTF-8; source and built page titles use plain letters.`);
