// Tests fuer die Japan-Integration (v7.28): Express-Bonus, Tor-Staedte, Editionsdaten.
const fs=require('fs');
const src=fs.readFileSync('/mnt/user-data/outputs/index.html','utf8');
function grab(name){
  const i=src.indexOf('function '+name+'(');if(i<0)throw new Error(name+' nicht gefunden');
  let d=0,j=src.indexOf('{',i);
  for(let k=j;k<src.length;k++){if(src[k]==='{')d++;if(src[k]==='}'){d--;if(!d)return src.slice(i,k+1)}}
}
eval(grab('expressBonus'));
const ED=JSON.parse(src.match(/const EDITIONEN = (\{[\s\S]*?\});\nlet EDITION/)[1]);
const J=ED.japan,EM=J.meta.express;
let n=0;const ok=(c,t)=>{n++;if(!c){console.error('FEHLER:',t);process.exit(1)}console.log('ok',n,t)};

// ---- Editionsdaten ----
ok(J.meta.version==='0.95'&&J.knoten.length===50&&J.strecken.length===114,'Japan v0.95: 50 Knoten, 114 Strecken');
ok(J.strecken.filter(s=>s.express).length===23&&J.strecken.every(s=>!s.express||s.farbe==='grau'),'23 Express-Strecken, alle grau');
ok(J.auftraege.length===54&&J.meta.regeln.doppelstrecken_frei_ab===3&&J.meta.wagons_pro_spieler===20,'54 Auftraege, Doppel ab 3, 20 Waggons');
ok(JSON.stringify(J.meta.verbunden)===JSON.stringify([["tokyo","tokyo_u"],["kokura","kokura_k"]]),'Tor-Staedte-Paare vorhanden');
const namen=new Set(J.knoten.map(k=>k.name));
ok(J.auftraege.every(a=>namen.has(a.von)&&namen.has(a.nach)),'alle Auftragsziele existieren');
ok(J.strecken.every(s=>String(s.laenge) in J.meta.regeln.punkte_pro_laenge),'Punktetabelle deckt alle Laengen');

// ---- expressBonus ----
const B=(e,m)=>expressBonus(e,m||EM).join(',');
ok(B([14,9,3])==='15,5,-10','3 Spieler klar: +15/+5/-10');
ok(B([14,14,0])==='15,15,-20','Gleichstand Platz 1: beide +15, Unbeteiligter -20');
ok(B([10,10,4,4,2])==='25,25,5,5,-10','5 Spieler mit zwei Gleichstaenden: 25/25/5/5/-10');
ok(B([0,0])==='-20,-20','alle unbeteiligt: -20/-20');
ok(B([5,3])==='10,-10','2 Spieler: +10/-10');
ok(B([7,7,7,1])==='20,20,20,-10','Dreier-Gleichstand vorn (4 Spieler): je +20, Letzter -10');
ok(B([1,2,3,4])==='-10,0,10,20','4 Spieler aufsteigend');

// ---- connected mit Tor-Staedten und Express-Claims (isoliert nachgestellt) ----
// Wir bauen die Kernlogik nach: Union ueber verbunden + claims 'X' zaehlt fuer alle.
function connSim(claims,pi,von,nach){
  const par={};const find=x=>par[x]===x?x:par[x]=find(par[x]);
  J.knoten.forEach(k=>par[k.id]=k.id);
  const uni=(a,b)=>{par[find(a)]=find(b)};
  (J.meta.verbunden||[]).forEach(v=>uni(v[0],v[1]));
  J.strecken.forEach(s=>{const c=claims[s.nr];if(c===pi||c==='X')uni(s.von,s.nach)});
  return find(von)===find(nach);
}
const nr=(a,b,f)=>J.strecken.find(s=>({}[''],{X:1},{ })&&{0:1}&&(s.von===a&&s.nach===b||s.von===b&&s.nach===a)&&(!f||s.farbe===f)).nr;
// Hakata (Kyushu-Inset) -> Tokyo (Hauptkarte) ueber beide Tore und eine Express-Strecke eines ANDEREN Spielers
const cl={};
cl[nr('hakata','kokura_k')]='X';                 // Express, von irgendwem gebaut
cl[nr('kokura','masuda')]=1;cl[nr('masuda','tottori')]=1;cl[nr('tottori','osaka','rot')]=1;
cl[nr('osaka','kyoto')]='X';cl[nr('kyoto','nagoya')]='X';cl[nr('nagoya','hamamatsu')]='X';
cl[nr('hamamatsu','odawara')]='X';cl[nr('odawara','tokyo')]='X';
ok(connSim(cl,1,'hakata','tokyo_u'),'Hakata->Tokyo-Inset: Tor Kokura + fremde Express-Strecken verbinden');
ok(!connSim(cl,2,'hakata','tokyo_u'),'anderer Spieler ohne eigene Strecken: nur Express reicht nicht durchgehend');
cl[nr('kokura','masuda')]='X';cl[nr('masuda','tottori')]='X';cl[nr('tottori','osaka','rot')]='X';
ok(connSim(cl,2,'hakata','tokyo_u'),'komplett ueber Express: verbindet jeden Spieler');
console.log('\nAlle',n,'Japan-Tests bestanden.');
