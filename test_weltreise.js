const fs=require('fs');
const h=fs.readFileSync('/home/claude/index.html','utf8');
const E=JSON.parse(fs.readFileSync('/tmp/ed.json','utf8'));
// Sandbox-Stubs
global.MAP=E.weltreise;global.BH=MAP.meta.board_h;
global.CNAME={rot:'Rot',gelb:'Gelb',gruen:'Grün',pink:'Pink',weiss:'Weiß',schwarz:'Schwarz',lok:'Joker',grau:'beliebig'};
global.CARDCOL={rot:'#c',gelb:'#c',gruen:'#c',pink:'#c',weiss:'#c',schwarz:'#c',lok:'#c'};
global.PCOL=[{id:'blau',hex:'#00b0f0'}];global.PTEXT={};
global.shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
global.nodes={};MAP.knoten.forEach(k=>nodes[k.id]=k);
global.nameToIds={};MAP.knoten.forEach(k=>(nameToIds[k.name]=nameToIds[k.name]||[]).push(k.id));
global.RAND={};global.BHX={};global.SEAT=0;global.TPOSL={};MAP.knoten.forEach(k=>(TPOSL[k.name]=TPOSL[k.name]||[]).push([k.x,k.y,k.tkx,k.tky]));
global.ROOM={players:[{name:'A',col:'blau',hand:{},tickets:[],score:0},{name:'B',col:'rot',hand:{},tickets:[],score:0}],game:{claims:{},open:[],deck:[],discard:[],deck2:[],discard2:[],haefen:{}},status:'playing'};
global.g=()=>ROOM.game;global.me=()=>ROOM.players[SEAT];
global.R=()=>MAP.meta.regeln;global.PTSv=l=>R().punkte_pro_laenge[l]||0;
global.drawCard=G=>{if(!G.deck.length){if(!G.discard.length)return null;G.deck=shuffle(G.discard);G.discard=[]}return G.deck.pop()};
global.tkLand=t=>!!t&&t.typ==='land';global.tkZiele=t=>t.ziele||[];
global.modal=()=>({querySelector:()=>({}),remove(){}});global.toast=()=>{};global.tkGuard=()=>false;global.myTurn=()=>true;global.el=()=>({});
global.document={getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[]};
// connected() und Weltreise-Block aus index.html laden
const grab=(start,end)=>{const a=h.indexOf(start),b=h.indexOf(end,a);if(a<0||b<0)throw new Error('grab '+start);return h.slice(a,b)};
eval(grab('function connected(pi,t){','function laengsteFor('));
eval(grab('// ---------- Weltreise (Rails & Sails)','\nfunction hostStart(){'));
eval(grab('function tkMinP(t)','function connected('));
let fails=0;const ok=(c,m)=>{if(!c){fails++;console.log('FEHLER:',m)}else console.log('ok  ',m)};
// Deck
const d=wrDeckNeu();ok(d.deck.length===80&&d.deck2.length===60,'Deckgroessen 80/60: '+d.deck.length+'/'+d.deck2.length);
ok(d.deck.filter(c=>c==='joker').length===14,'14 Joker');ok(d.deck.filter(c=>c==='wagen_rot_hafen').length===4&&d.deck2.filter(c=>c==='schiff_rot_2').length===6,'Kartenverteilung');
// Auslage/Nachlegen
const G=g();G.deck=d.deck;G.deck2=d.deck2;G.open=['joker','joker','joker','wagen_rot','schiff_rot_1','schiff_gelb_2'];wrJokerReset(G);
ok(G.open.length===6&&G.discard.length===4&&G.discard2.length===2,'Joker-Reset: 6 neu, Ablagen 4/2 -> '+G.discard.length+'/'+G.discard2.length);
// Bezahloptionen Zug
const S=n=>MAP.strecken.find(s=>s.nr===n);
const zug=MAP.strecken.find(s=>s.typ==='zug'&&s.farbe==='rot'&&s.laenge===3&&!s.gelaende);
let o=bauOptionenWR(zug,{wagen_rot:2,wagen_rot_hafen:1});ok(o.length===1&&o[0].pay.wagen_rot===2&&o[0].pay.wagen_rot_hafen===1,'Zug rot 3: erst ohne, dann mit Hafen');
o=bauOptionenWR(zug,{wagen_rot:1,joker:2});ok(o.length===1&&o[0].pay.joker===2,'Zug rot 3 mit 2 Jokern');
o=bauOptionenWR(zug,{wagen_rot:2});ok(o.length===0,'Zug rot 3 mit 2 Karten: keine Option');
o=bauOptionenWR(zug,{schiff_rot_2:2});ok(o.length===0,'Zugstrecke nicht mit Schiffskarten');
// Schiff
const sch=MAP.strecken.find(s=>s.typ==='schiff'&&s.farbe==='gruen'&&s.laenge===5);
o=bauOptionenWR(sch,{schiff_gruen_2:3});ok(o.length===1&&o[0].pay.schiff_gruen_2===3&&o[0].ueber===1,'Schiff grün 5 mit 3 Doppel: Ueberzahlung erlaubt');
o=bauOptionenWR(sch,{schiff_gruen_2:3,schiff_gruen_1:1});ok(o.length>=1&&o[0].ueber===0&&o[0].pay.schiff_gruen_2===2&&o[0].pay.schiff_gruen_1===1,'Schiff grün 5: exakt 2 Doppel + 1 Einzel bevorzugt; Optionen='+o.length+' '+JSON.stringify(o[0].pay));
o=bauOptionenWR(sch,{schiff_gruen_2:2,joker:1});ok(o.length===1&&o[0].pay.joker===1,'Schiff grün 5: 2 Doppel + Joker');
o=bauOptionenWR(sch,{wagen_gruen:5});ok(o.length===0,'Schiffsstrecke nicht mit Wagenkarten');
const grauS=MAP.strecken.find(s=>s.typ==='schiff'&&s.farbe==='grau'&&s.laenge===3);
o=bauOptionenWR(grauS,{schiff_rot_2:1,schiff_rot_1:1,schiff_gelb_1:3});ok(o.length===2,'graue Schiffsstrecke 3: rot (1+1) und gelb (3): '+o.length);
// Gelaende
const gel=MAP.strecken.find(s=>s.gelaende===2);
o=bauOptionenWR(gel,{wagen_rot:2,wagen_gelb:2});ok(o.length===1&&o[0].pay.wagen_rot===2&&o[0].pay.wagen_gelb===2,'Gelände 2: rot-Paar + gelb-Paar');
o=bauOptionenWR(gel,{wagen_rot:3,wagen_gelb:1});ok(o.length===0,'Gelände 2: 3 rot + 1 gelb reicht nicht');
o=bauOptionenWR(gel,{wagen_rot:4});ok(o.length===1&&o[0].pay.wagen_rot===4,'Gelände 2: 4 rot');
o=bauOptionenWR(gel,{wagen_rot:3,joker:1});ok(o.length===1&&o[0].pay.joker===1,'Gelände 2: 3 rot + Joker');
o=bauOptionenWR(gel,{joker:4});ok(o.length===1&&o[0].pay.joker===4,'Gelände 2: nur Joker');
const gel3=MAP.strecken.find(s=>s.gelaende===3);
o=bauOptionenWR(gel3,{wagen_rot:2,wagen_gelb:2,wagen_gruen:2,wagen_pink:2});ok(o.length===4,'Gelände 3 aus 4 Farbpaaren: 4 Kombinationen: '+o.length);
// Haefen
let ho=wrHafenOptionen({wagen_rot_hafen:2,schiff_rot_1:2});ok(ho.length===1&&!ho[0].joker,'Hafen: 2+2 rot');
ho=wrHafenOptionen({wagen_rot:2,schiff_rot_1:2});ok(ho.length===0,'Hafen: Wagen ohne Hafensymbol zaehlen nicht');
ho=wrHafenOptionen({wagen_rot_hafen:1,schiff_rot_1:2,joker:1});ok(ho.length===1&&ho[0].pay.joker===1,'Hafen: Joker ersetzt');
ho=wrHafenOptionen({wagen_rot_hafen:2,schiff_gelb_1:2,joker:2});ok(ho.length===2&&ho.every(x=>x.joker===2),'Hafen: Farbmix nur mit Jokern: '+ho.length);
// Hafenstaedte
const nr=s=>MAP.strecken.find(x=>x.von===s[0]&&x.nach===s[1]).nr;
G.claims[nr(['hamburg','moskva'])]=0;G.claims[nr(['moskva','novosibirsk'])]=0;
let st=wrHafenStaedte(0);ok(st.length===1&&st[0]==='hamburg','Hafenstaedte nur Hamburg (Moskva/Novosibirsk binnen): '+st);
G.haefen.hamburg=1;ok(wrHafenStaedte(0).length===0,'besetzter Hafen ausgeschlossen');delete G.haefen.hamburg;
// Routen-Zielkarte Casablanca-Al-Qahira-Tehran
const rt=MAP.auftraege.find(t=>t.typ==='route'&&t.stationen[0]==='Casablanca');
G.claims={};ok(wrRouteStatus(0,rt)===null&&tkWert(0,rt)===-rt.minus,'Route offen: -'+rt.minus);
G.claims[nr(['casablanca','al_qahira'])]=0;G.claims[nr(['athina','tehran'])]=0;G.claims[MAP.strecken.find(x=>x.von==='athina'&&x.nach==='al_qahira').nr]=0;
ok(wrRouteStatus(0,rt)==='ordnung','Route Casablanca-Al-Qahira-Athina-Tehran: in Reihenfolge ueber Athina');
G.claims={};G.claims[nr(['casablanca','al_qahira'])]=0;G.claims[MAP.strecken.find(x=>x.von==='al_qahira'&&x.nach==='tehran').nr]=0;
ok(wrRouteStatus(0,rt)==='ordnung'&&tkWert(0,rt)===rt.punkte,'Route direkt in Reihenfolge: '+rt.punkte);
// im Netz, aber nicht in Reihenfolge: Casablanca-Marseille-Athina-Tehran und Athina-Al-Qahira => Reihenfolge Casablanca..Al-Qahira..Tehran
G.claims={};G.claims[nr(['marseille','casablanca'])]=0;G.claims[nr(['marseille','athina'])]=0;G.claims[nr(['athina','tehran'])]=0;G.claims[MAP.strecken.find(x=>x.von==='athina'&&x.nach==='al_qahira').nr]=0;
ok(wrRouteStatus(0,rt)==='netz'&&tkWert(0,rt)===rt.punkte_ungeordnet,'Route nur im Netz (Al-Qahira Sackgasse): '+rt.punkte_ungeordnet);
ok(tkErfuellt(0,rt)===true&&tkGleich(rt,Object.assign({},rt))&&!tkGleich(rt,{von:'A',nach:'B',punkte:1}),'tkErfuellt/tkGleich Route');
// Hafenwertung
ROOM.players[0].tickets=[rt,{von:'Casablanca',nach:'Yakutsk',punkte:16}];ROOM.players[0].haefen=['casablanca'];
let hw=wrHafenWertung(0);ok(hw[0].tickets===1&&hw[0].pkt===20,'Hafen Casablanca: 1 erfuellte Zielkarte -> 20');
G.claims[nr(['casablanca','lagos'])]=0;ROOM.players[0].tickets.push({von:'Lagos',nach:'Tehran',punkte:10});hw=wrHafenWertung(0);ok(hw[0].tickets===1,'Zielkarte ohne die Stadt zaehlt nicht');
// Ticketkarte Route rendert
const card=ticketCardRoute(rt,'',false);ok(card.includes('<circle')&&card.includes('Casablanca › Al-Qahira › Tehran'),'Routen-Zielkarte SVG');
console.log(fails?'FEHLER: '+fails:'ALLE TESTS BESTANDEN');
