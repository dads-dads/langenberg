// Funktionale Tests fuer die Italia-Integration (v7.17):
// Faehrenkarten-Kombinatorik und Regionenbonus, direkt aus index.html extrahiert.
const fs=require('fs');
const src=fs.readFileSync('/home/claude/index.html','utf8');
function grab(name){
  const i=src.indexOf('function '+name+'(');if(i<0)throw new Error(name+' nicht gefunden');
  let d=0,j=src.indexOf('{',i);
  for(let k=j;k<src.length;k++){if(src[k]==='{')d++;if(src[k]==='}'){d--;if(!d){return src.slice(i,k+1)}}}
}
eval(grab('fkWellenKombis'));eval(grab('regionenPunkte'));
const ED=JSON.parse(src.match(/const EDITIONEN = (\{[\s\S]*?\});\nlet EDITION/)[1]);
const M=ED.italia;const FKM=M.meta.faehrenkarten;
let n=0;const ok=(c,t)=>{n++;if(!c){console.error('FEHLER:',t);process.exit(1)}console.log('ok',n,t)};

// ---- fkWellenKombis ----
const key=l=>l.map(x=>x.fk+'/'+x.lokW).sort().join(' ');
ok(key(fkWellenKombis(0,0,0,FKM))===key([{fk:0,lokW:0}]),'keine Wellen -> eine leere Kombi');
ok(key(fkWellenKombis(4,4,2,FKM))===key([{fk:0,lokW:4},{fk:1,lokW:2},{fk:2,lokW:0}]),'4 Wellen, 4 Loks, 2 FK -> 3 Kombis');
ok(key(fkWellenKombis(4,1,2,FKM))===key([{fk:2,lokW:0}]),'4 Wellen, 1 Lok -> nur 2 FK');
ok(key(fkWellenKombis(3,0,2,FKM))===key([{fk:2,lokW:0}]),'3 Wellen ohne Loks -> 2 FK (letzte deckt 1)');
ok(key(fkWellenKombis(3,1,1,FKM))===key([{fk:1,lokW:1}]),'3 Wellen, 1 Lok, 1 FK');
ok(fkWellenKombis(4,3,0,FKM).length===0,'4 Wellen, 3 Loks, 0 FK -> unbaubar');
ok(fkWellenKombis(1,0,2,FKM).length===1&&fkWellenKombis(1,0,2,FKM)[0].fk===1,'1 Welle nur mit FK');
// Skandinavien-Verhalten ohne FK-Meta unveraendert:
ok(key(fkWellenKombis(2,3,5,undefined))===key([{fk:0,lokW:2}]),'ohne faehrenkarten-Meta: nur Loks');
ok(fkWellenKombis(2,1,5,undefined).length===0,'ohne Meta und zu wenig Loks: leer');

// ---- regionenPunkte ----
const bynr={};M.strecken.forEach(s=>bynr[s.nr]=s);
const find=(a,b)=>M.strecken.find(s=>(s.von===a&&s.nach===b)||(s.von===b&&s.nach===a))||console.error('Strecke fehlt',a,b);
// leer
ok(regionenPunkte(M,[]).summe===0,'keine Strecken -> 0');
// Kette mit 4 Regionen -> 0 Punkte
let nrs=[find('torino','milano').nr,find('milano','parma').nr,find('parma','bologna').nr,find('bologna','firenze').nr];
let r=regionenPunkte(M,nrs);
ok(r.netze.length===1&&r.netze[0].anz===4&&r.summe===0,'4 Regionen (Piemonte,Lombardia,E-R,Toscana) -> 0');
// +1 Region (Liguria) -> 5 Regionen = 1 Punkt
nrs.push(find('torino','genova').nr);r=regionenPunkte(M,nrs);
ok(r.netze[0].anz===5&&r.summe===1,'5 Regionen -> 1 Punkt');
// Regelbeispiel: zwei Teilnetze mit je 5 Regionen -> 1+1
const netz2=[find('roma','napoli').nr,find('napoli','foggia').nr,find('foggia','pescara').nr,find('perugia','pescara').nr];
r=regionenPunkte(M,nrs.concat(netz2));
ok(r.netze.length===2&&r.netze[0].anz===5&&r.netze[1].anz===5&&r.summe===2,'zwei Netze je 5 Regionen -> 1+1');
// Sonderregion Sardegna doppelt: alle 3 Staedte verbunden
const sard=[find('sassari','olbia').nr,find('olbia','cagliari').nr,find('cagliari','roma').nr,find('roma','napoli').nr,find('napoli','salerno').nr,find('roma','pescara').nr];
r=regionenPunkte(M,sard);
// Regionen: Sardegna(x2), Lazio, Campania, Abruzzo -> 4+1 doppelt = 5 -> 1 Punkt
ok(r.netze.length===1&&r.netze[0].anz===5&&r.netze[0].doppelt===1&&r.summe===1,'Sardegna komplett zaehlt doppelt');
// Ohne Cagliari kein Doppel
const sard2=[find('sassari','olbia').nr,find('olbia','roma').nr,find('roma','napoli').nr,find('napoli','salerno').nr,find('roma','pescara').nr];
r=regionenPunkte(M,sard2);
ok(r.netze[0].anz===4&&r.netze[0].doppelt===0,'Sardegna unvollstaendig zaehlt einfach');
// Randknoten verschmelzen nicht: zwei Strecken an verschiedenen Francia-Einmuendungen bleiben getrennt
const f1=M.strecken.find(s=>s.nach==='francia_1'||s.von==='francia_1');
const f2=M.strecken.find(s=>s.nach==='francia_2'||s.von==='francia_2');
r=regionenPunkte(M,[f1.nr,f2.nr]);
ok(r.netze.length===1,'beide enden in Torino -> ein Netz (ueber Torino, nicht ueber Francia)');
const g1=find('trieste','croazia_1'),g3=find('bari','croazia_3');
r=regionenPunkte(M,[g1.nr,g3.nr]);
ok(r.netze.length===2,'croazia_1 und croazia_3 verbinden nicht');
// 15+ -> 56 Punkte: grosses Netz aus vielen Strecken
const big=['torino-milano','milano-parma','torino-genova','genova-pisa','parma-bologna','bologna-firenze','bologna-verona','verona-venezia','venezia-tarvisio','bolzano-verona','venezia-trieste','bologna-ravenna','perugia-ravenna','firenze-perugia','perugia-roma','roma-napoli','napoli-salerno','perugia-pescara','napoli-foggia','perugia-ancona','salerno-cosenza','cosenza-taranto','olbia-roma','olbia-cagliari','sassari-olbia','napoli-messina'.replace('napoli','salerno')]
  .map(x=>{const[a,b]=x.split('-');return find(a,b).nr});
r=regionenPunkte(M,big);
ok(r.netze.length===1&&r.netze[0].anz>=15&&r.summe===56,'grosses Netz: '+r.netze[0].anz+' Regionen -> 56');
// Punktetabelle stichprobenartig
const tab=M.meta.regionen.punkte;
ok(tab['9']===11&&tab['12']===29&&tab['15']===56,'Punktetabelle 9->11, 12->29, 15->56');
console.log('\nAlle',n,'Tests bestanden.');
