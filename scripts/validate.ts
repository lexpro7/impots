import assert from 'node:assert/strict';
import {cards} from '../src/data/course';
import {questions} from '../src/data/questions';
import {practice} from '../src/data/practice';
import {isCorrect,grade,prepare,shuffle} from '../src/engine';
assert.equal(cards.length,30);assert.equal(questions.length,70);assert.equal(practice.length,15);
const all=[...questions,...practice];assert.equal(new Set(all.map(q=>q.id)).size,all.length);
for(const c of cards){for(const b of [c.title,c.definition,c.example,c.claim])assert.ok(b.fr.trim()&&b.ru.trim());}
for(const q of all){for(const b of [q.prompt,q.explanation,...q.options])assert.ok(b.fr.trim()&&b.ru.trim());if(q.kind==='number'){assert.ok(Number.isFinite(q.value));assert.ok(isCorrect(q,[],String(q.value)));assert.ok(isCorrect(q,[],String(q.value).replace('.',',')));assert.ok(!isCorrect(q,[],''));assert.ok(!isCorrect(q,[],'abc'));assert.ok(!isCorrect(q,[],String(q.value!+1)));}else{assert.ok(q.correct.length>0);assert.ok(q.correct.every(i=>i>=0&&i<q.options.length));assert.ok(isCorrect(q,q.correct,''));assert.ok(!isCorrect(q,[],''));if(q.kind==='single')assert.equal(q.options.length,4);if(q.kind==='multiple'){assert.ok(!isCorrect(q,q.correct.slice(1),''));assert.ok(!isCorrect(q,q.options.map((_,i)=>i),''));}for(let n=0;n<10;n++){const mixed=prepare(q);assert.deepEqual(mixed.correct.map(i=>mixed.options[i].fr).sort(),q.correct.map(i=>q.options[i].fr).sort());}}}
assert.equal(grade(0,20),1);assert.equal(grade(20,20),6);assert.equal(grade(12,20),4);assert.equal(grade(7,15),3.3);
assert.deepEqual(shuffle([1,2,3,4]).sort(),[1,2,3,4]);
for(const [id,expected] of [['p4',216.2/1.081],['p5',540.5-540.5/1.081],['p11',1300/.65]] as const){assert.ok(Math.abs(practice.find(q=>q.id===id)!.value!-expected)<.005)}
console.log('PASS: 30 bilingual cards, 70 quiz questions, 15 practice situations; translations, IDs, grading, exact multi-select, shuffling and numeric calculations.');
