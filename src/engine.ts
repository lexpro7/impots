import type {Question} from './data/questions';
export function shuffle<T>(items:T[]):T[]{const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function prepare(q:Question):Question {if(q.kind==='boolean'||q.kind==='number')return q;const indices=shuffle(q.options.map((_,i)=>i));return {...q,options:indices.map(i=>q.options[i]),correct:indices.flatMap((old,i)=>q.correct.includes(old)?[i]:[])};}
export function isCorrect(q:Question,selected:number[],numeric:string){return q.kind==='number'?numeric.trim()!==''&&Number.isFinite(Number(numeric.replace(',','.')))&&Math.abs(Number(numeric.replace(',','.'))-q.value!)<0.005:selected.length===q.correct.length&&q.correct.every(i=>selected.includes(i));}
export const grade=(right:number,total:number)=>total?Math.round((1+5*right/total)*10)/10:1;
