const PLACES = [
 {id:"cao-grande",name:"Pico Cão Grande",island:"São Tomé",category:"LANDSCAPE · NATURE",coords:[6.5658,0.1181],summary:"A striking volcanic tower rises above the rainforest of southern São Tomé. Its dramatic silhouette is one of the archipelago’s best-known natural landmarks.",tags:["Volcanic landmark","Rainforest setting","Ôbo region"],image:"https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1100&q=85",zoom:11},
 {id:"sao-tome-city",name:"São Tomé City",island:"São Tomé",category:"CULTURE · HISTORY",coords:[6.7273,0.3365],summary:"The island capital brings together waterfront life, markets, historic buildings and the everyday rhythms of the archipelago.",tags:["Historic centre","Waterfront","Local markets"],image:"https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1100&q=85",zoom:12},
 {id:"sao-joao",name:"Roça São João dos Angolares",island:"São Tomé",category:"HERITAGE · FOOD",coords:[6.6472,0.1328],summary:"A historic plantation setting associated with Angolar culture and a celebrated local food experience. Confirm opening times and visits before travelling.",tags:["Roça heritage","Angolar culture","Local cuisine"],image:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1100&q=85",zoom:12},
 {id:"rolas",name:"Ilhéu das Rolas",island:"São Tomé",category:"ISLAND · EQUATOR",coords:[6.5236,0.0000],summary:"A small island off southern São Tomé, known for the Equator monument and coastal scenery. Boat transfers and access should be arranged locally.",tags:["Equator monument","Boat excursion","Coastal scenery"],image:"https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1100&q=85",zoom:12},
 {id:"lagoa-azul",name:"Lagoa Azul",island:"São Tomé",category:"COAST · NATURE",coords:[6.6114,0.4061],summary:"A sheltered bay on the northern coast, known for clear water and a scenic shoreline. Sea conditions vary, so check locally before swimming or snorkelling.",tags:["Northern coast","Clear-water bay","Snorkelling conditions vary"],image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=85",zoom:12},
 {id:"praia-banana",name:"Praia Banana",island:"Príncipe",category:"BEACH · COAST",coords:[1.6139,7.4178],summary:"A celebrated crescent-shaped beach on Príncipe, framed by lush green slopes and the Atlantic. Local transport and access arrangements are recommended.",tags:["Príncipe coastline","Scenic beach","Island escape"],image:"https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1100&q=85",zoom:12},
 {id:"roca-sundy",name:"Roça Sundy",island:"Príncipe",category:"HERITAGE · HISTORY",coords:[1.6150,7.3830],summary:"A historic plantation estate on Príncipe with an important place in the island’s social and scientific history.",tags:["Plantation heritage","Island history","Príncipe"],image:"https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1100&q=85",zoom:12}
];
const $=s=>document.querySelector(s);
let activeFilter="All", selected=PLACES[0], map=null, markers={};
function coordsText(p){const [lat,lon]=p.coords;return `${Math.abs(lat).toFixed(4)}° ${lat>=0?"N":"S"}, ${Math.abs(lon).toFixed(4)}° ${lon>=0?"E":"W"}`;}
function renderList(){
 const list=$("#destinationList");list.innerHTML="";
 PLACES.filter(p=>activeFilter==="All"||p.island===activeFilter).forEach(p=>{
  const b=document.createElement("button");b.className="destination-item"+(p.id===selected.id?" selected":"");b.innerHTML=`<small>${p.island.toUpperCase()} · ${p.category}</small><strong>${p.name}</strong><span>${p.summary.slice(0,105)}…</span>`;b.addEventListener("click",()=>selectPlace(p));list.appendChild(b);
 });
}
function renderDetail(){
 $("#detailName").textContent=selected.name;$("#detailIsland").textContent=selected.island.toUpperCase();$("#detailCategory").textContent=selected.category;$("#detailSummary").textContent=selected.summary;$("#coordinateLine").textContent=`Approximate map coordinates: ${coordsText(selected)}`;
 $("#detailImage").style.backgroundImage=`url("${selected.image}")`;
 $("#detailTags").innerHTML="";selected.tags.forEach(t=>{const s=document.createElement("span");s.textContent=t;$("#detailTags").appendChild(s);});
}
function selectPlace(p){
 selected=p;renderList();renderDetail();
 if(map){map.flyTo({center:[p.coords[1],p.coords[0]],zoom:p.zoom,speed:0.9});}
 if(window.speechSynthesis)window.speechSynthesis.cancel();
 $("#audioButton").textContent="▶ Listen to overview";
}
function setupMap(){
 if(!window.maplibregl){$("#map").innerHTML="<div class='map-unavailable'>Map could not load. Please check your internet connection.</div>";return;}
 map=new maplibregl.Map({container:"map",style:"https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",center:[0.65,6.85],zoom:6.3,attributionControl:true});
 map.addControl(new maplibregl.NavigationControl({showCompass:false}),"top-right");
 map.on("load",()=>{
  PLACES.forEach(p=>{
   const el=document.createElement("button");el.type="button";el.setAttribute("aria-label",`Show ${p.name}`);el.style.cssText="width:15px;height:15px;border:3px solid white;border-radius:50%;background:#b48a3c;box-shadow:0 1px 8px #173d2b99;cursor:pointer";
   el.addEventListener("click",()=>selectPlace(p));
   const marker=new maplibregl.Marker({element:el}).setLngLat([p.coords[1],p.coords[0]]).setPopup(new maplibregl.Popup({offset:15}).setText(p.name)).addTo(map);
   markers[p.id]=marker;
  });
  // A visual reference line at latitude zero; this is not a surveyed boundary.
  map.addSource("equator",{type:"geojson",data:{type:"Feature",geometry:{type:"LineString",coordinates:[[-2,0],[4,0]]}}});
  map.addLayer({id:"equator-line",type:"line",source:"equator",paint:{"line-color":"#b48a3c","line-width":1.5,"line-dasharray":[3,3]}});
 });
 map.on("error",e=>console.warn("Map service reported an error:",e.error||e));
}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{activeFilter=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderList();}));
document.querySelectorAll("[data-filter-link]").forEach(a=>a.addEventListener("click",()=>{activeFilter=a.dataset.filterLink;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===activeFilter));renderList();}));
$("#audioButton").addEventListener("click",()=>{
 if(!("speechSynthesis" in window)){alert("Audio narration is not supported in this browser.");return;}
 if(window.speechSynthesis.speaking){window.speechSynthesis.cancel();$("#audioButton").textContent="▶ Listen to overview";return;}
 const u=new SpeechSynthesisUtterance(`${selected.name}, on ${selected.island}. ${selected.summary}`);u.rate=.94;u.onend=()=>$("#audioButton").textContent="▶ Listen to overview";u.onerror=()=>$("#audioButton").textContent="▶ Listen to overview";$("#audioButton").textContent="■ Stop audio";window.speechSynthesis.speak(u);
});
$("#copyButton").addEventListener("click",async()=>{
 const value=`${selected.name}: ${coordsText(selected)}`;
 try{await navigator.clipboard.writeText(value);$("#copyButton").textContent="Copied ✓";setTimeout(()=>$("#copyButton").textContent="Copy coordinates",1800);}
 catch(e){window.prompt("Copy these coordinates:",value);}
});
$("#menuToggle").addEventListener("click",()=>{const open=$("#mainNav").classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",String(open));});
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>{$("#mainNav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");}));
$("#year").textContent=new Date().getFullYear();
renderList();renderDetail();setupMap();
