const PLACES = [
 {id:"cao-grande",name:"Pico Cão Grande",island:"São Tomé",category:"Nature",categoryLabel:"LANDSCAPE · NATURE",coords:[0.11819,6.56636],summary:"A dramatic volcanic needle rises 663 metres above the southern rainforest within Obô Natural Park. Viewpoints and approaches should be planned with local guidance; technical climbing is for experienced, properly equipped climbers.",tags:["Volcanic landmark","Obô Natural Park","663 m"],image:"https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1100&q=85",zoom:11,source:"Official tourism portal and responsible tourism guide"},
 {id:"sao-tome-city",name:"São Tomé City",island:"São Tomé",category:"Culture",categoryLabel:"CULTURE · HISTORY",coords:[0.3365,6.7273],summary:"Explore the capital around Ana Chaves Bay, including its historic centre, cathedral, São Sebastião Fort, markets and cultural spaces. Confirm opening times for museums and attractions locally.",tags:["Historic centre","Ana Chaves Bay","Culture"],image:"https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1100&q=85",zoom:13},
 {id:"sao-joao",name:"Roça São João dos Angolares",island:"São Tomé",category:"Heritage",categoryLabel:"HERITAGE · FOOD",coords:[0.1328,6.6472],summary:"A former plantation and cultural setting in the south associated with Angolar heritage, arts and local gastronomy. Confirm visits, restaurant availability and opening times in advance.",tags:["Roça heritage","Angolar culture","Local cuisine"],image:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1100&q=85",zoom:12},
 {id:"rolas",name:"Ilhéu das Rolas",island:"São Tomé",category:"Beach",categoryLabel:"ISLAND · EQUATOR",coords:[-0.00494,6.52046],summary:"A small volcanic islet south of São Tomé crossed by the Equator. Visitors can arrange boat transfers and explore the Equator marker and coastal viewpoints; ask locally about sea conditions and access.",tags:["Equator marker","Boat transfer","Coastal scenery"],image:"https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1100&q=85",zoom:12},
 {id:"lagoa-azul",name:"Lagoa Azul",island:"São Tomé",category:"Beach",categoryLabel:"COAST · NATURE",coords:[0.40710,6.61023],summary:"A bay on São Tomé’s north-western coast near the Lagoa Azul lighthouse. Enjoy the shoreline and ask local hosts about safe swimming and snorkelling conditions.",tags:["North-west coast","Coastal bay","Local hosts"],image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=85",zoom:12},
 {id:"sao-nicolau",name:"São Nicolau Waterfall",island:"São Tomé",category:"Nature",categoryLabel:"WATERFALL · NATURE",coords:[0.28607,6.62528],summary:"A well-known waterfall in the Mé-Zóchi highlands, reached along the route towards the island’s interior. Conditions and access can vary; use a local guide and take care on wet paths.",tags:["Waterfall","Mé-Zóchi","Local guide recommended"],image:"https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1100&q=85",zoom:13},
 {id:"bom-sucesso",name:"Bom Sucesso Botanical Garden",island:"São Tomé",category:"Nature",categoryLabel:"BOTANICAL GARDEN · NATURE",coords:[0.28905,6.61216],summary:"A mountain botanical garden and gateway to Obô Natural Park, with native and endemic plant collections and a role in education and conservation. Ask about guided visits and trail conditions.",tags:["Botanical garden","Obô gateway","Conservation"],image:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=85",zoom:13},
 {id:"praia-jale",name:"Praia Jalé",island:"São Tomé",category:"Beach",categoryLabel:"BEACH · WILDLIFE",coords:[-0.015,6.75],summary:"A southern beach noted by the national tourism portal for turtle-related conservation and observation opportunities. Turtle activity is seasonal and must be observed through responsible local operators without disturbing wildlife.",tags:["Southern coast","Turtle conservation","Responsible wildlife viewing"],image:"https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1100&q=85",zoom:12},
 {id:"praia-banana",name:"Praia Banana",island:"Príncipe",category:"Beach",categoryLabel:"BEACH · COAST",coords:[1.6139,7.4178],summary:"Príncipe’s best-known beach, with a curved shoreline and green hills. The official tourism portal highlights its viewpoint and seasonal whale-watching possibilities; use local guidance for access.",tags:["Príncipe coastline","Scenic viewpoint","Seasonal whale watching"],image:"https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1100&q=85",zoom:13},
 {id:"roca-sundy",name:"Roça Sundy",island:"Príncipe",category:"Heritage",categoryLabel:"HERITAGE · SCIENCE",coords:[1.6150,7.3830],summary:"A historic plantation estate on Príncipe. In 1919, observations made at Roça Sundy formed part of the experiment that helped confirm Einstein’s theory of relativity.",tags:["Plantation heritage","1919 eclipse expedition","Príncipe"],image:"https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1100&q=85",zoom:13},
 {id:"santo-antonio",name:"Santo António",island:"Príncipe",category:"Culture",categoryLabel:"TOWN · CULTURE",coords:[1.6394,7.4190],summary:"The small capital of Príncipe is a starting point for discovering the island’s everyday life, local architecture and community culture. Confirm local transport and visitor arrangements.",tags:["Príncipe capital","Local culture","Island life"],image:"https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1100&q=85",zoom:14},
 {id:"obo-principe",name:"Príncipe Natural Landscapes",island:"Príncipe",category:"Nature",categoryLabel:"NATURE · BIODIVERSITY",coords:[1.6200,7.3900],summary:"Príncipe is known for rich biodiversity, forested interiors and coastal viewpoints. Explore with qualified local guides and follow conservation advice in protected areas.",tags:["Biosphere landscape","Rainforest","Guided nature walks"],image:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1100&q=85",zoom:10}
];
// Coordinates are stored as [latitude, longitude]; MapLibre receives [longitude, latitude].
const $=s=>document.querySelector(s);
let activeFilter="All", activeCategory="All", query="", selected=PLACES[0], map=null, markers={};
let saved=new Set();
try{saved=new Set(JSON.parse(localStorage.getItem("emeraldSavedPlaces")||"[]"));}catch(e){}
function coordsText(p){const [lat,lon]=p.coords;return `${Math.abs(lat).toFixed(5)}° ${lat>=0?"N":"S"}, ${Math.abs(lon).toFixed(5)}° ${lon>=0?"E":"W"}`;}
function getVisible(){
 return PLACES.filter(p=>{
  const islandOk=activeFilter==="All"||activeFilter==="Saved"&&saved.has(p.id)||p.island===activeFilter;
  const catOk=activeCategory==="All"||p.category===activeCategory;
  const qOk=!query||`${p.name} ${p.island} ${p.category} ${p.summary} ${p.tags.join(" ")}`.toLowerCase().includes(query);
  return islandOk&&catOk&&qOk;
 });
}
function renderList(){
 const list=$("#destinationList"), visible=getVisible();list.innerHTML="";
 $("#resultsCount").textContent=`${visible.length} ${UI_LOCALES[currentLanguage]?.results||"places found"}`;
 if(!visible.length){list.innerHTML=`<p class="empty-results">${UI_LOCALES[currentLanguage]?.empty||"No destinations match your search."}</p>`;return;}
 visible.forEach(p=>{
  const b=document.createElement("button");b.className="destination-item"+(p.id===selected.id?" selected":"");
  const small=document.createElement("small");small.textContent=`${p.island.toUpperCase()} · ${p.categoryLabel}`;
  const strong=document.createElement("strong");strong.textContent=p.name;
  const span=document.createElement("span");span.textContent=p.summary.slice(0,112)+"…";
  const fav=document.createElement("i");fav.className="item-fav";fav.textContent=saved.has(p.id)?"♥":"♡";fav.setAttribute("aria-label",saved.has(p.id)?"Saved":"Not saved");
  b.append(small,strong,span,fav);b.addEventListener("click",()=>selectPlace(p));list.appendChild(b);
 });
}
function renderDetail(){
 $("#detailName").textContent=selected.name;$("#detailIsland").textContent=selected.island.toUpperCase();$("#detailCategory").textContent=selected.categoryLabel;$("#detailSummary").textContent=selected.summary;$("#coordinateLine").textContent=`Approximate map coordinates: ${coordsText(selected)}`;
 $("#detailImage").style.backgroundImage=`url("${selected.image}")`;
 $("#detailTags").innerHTML="";selected.tags.forEach(t=>{const s=document.createElement("span");s.textContent=t;$("#detailTags").appendChild(s);});
 $("#saveButton").textContent=saved.has(selected.id)?(UI_LOCALES[currentLanguage]?.savedPlace||"♥ Saved place"):(UI_LOCALES[currentLanguage]?.savePlace||"♡ Save place");
}
function selectPlace(p){
 selected=p;renderList();renderDetail();
 if(map){map.flyTo({center:[p.coords[1],p.coords[0]],zoom:p.zoom,speed:0.9});}
 if(window.speechSynthesis)window.speechSynthesis.cancel();
 $("#audioButton").textContent=UI_LOCALES[currentLanguage]?.listen||"▶ Listen to overview";
}
function setupMap(){
 if(!window.maplibregl){console.warn("MapLibre did not load; keeping the OpenStreetMap iframe fallback visible.");return;}
 const fallback=$("#map-fallback");if(fallback)fallback.remove();
 map=new maplibregl.Map({container:"map",style:{version:8,sources:{osm:{type:"raster",tiles:["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],tileSize:256,attribution:"© OpenStreetMap contributors"}},layers:[{id:"osm-base",type:"raster",source:"osm",minzoom:0,maxzoom:19}]},center:[6.9,0.9],zoom:6.3,attributionControl:true});
 map.addControl(new maplibregl.NavigationControl({showCompass:false}),"top-right");
 map.on("load",()=>{map.resize();
  PLACES.forEach(p=>{
   const el=document.createElement("button");el.type="button";el.setAttribute("aria-label",`Show ${p.name}`);el.style.cssText="width:15px;height:15px;border:3px solid white;border-radius:50%;background:#b48a3c;box-shadow:0 1px 8px #173d2b99;cursor:pointer";
   el.addEventListener("click",()=>selectPlace(p));
   const marker=new maplibregl.Marker({element:el}).setLngLat([p.coords[1],p.coords[0]]).setPopup(new maplibregl.Popup({offset:15}).setText(p.name)).addTo(map);
   markers[p.id]=marker;
  });
  map.addSource("equator",{type:"geojson",data:{type:"Feature",geometry:{type:"LineString",coordinates:[[5.8,0],[7.8,0]]}}});
  map.addLayer({id:"equator-line",type:"line",source:"equator",paint:{"line-color":"#b48a3c","line-width":1.5,"line-dasharray":[3,3]}});
 });
 map.on("error",e=>{console.warn("Map service reported an error:",e.error||e);const msg=$("#map .map-error-message");if(msg)msg.textContent="Map tiles are temporarily unavailable. Please reload or check your connection.";});
}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{
 activeFilter=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderList();
}));
document.querySelectorAll(".category-filter").forEach(b=>b.addEventListener("click",()=>{
 activeCategory=b.dataset.category;document.querySelectorAll(".category-filter").forEach(x=>x.classList.toggle("active",x===b));renderList();
}));
$("#destinationSearch").addEventListener("input",e=>{query=e.target.value.trim().toLowerCase();renderList();});
document.querySelectorAll("[data-filter-link]").forEach(a=>a.addEventListener("click",()=>{activeFilter=a.dataset.filterLink;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===activeFilter));renderList();}));
$("#saveButton").addEventListener("click",()=>{
 if(saved.has(selected.id))saved.delete(selected.id);else saved.add(selected.id);
 try{localStorage.setItem("emeraldSavedPlaces",JSON.stringify([...saved]));}catch(e){}
 renderDetail();renderList();
});
$("#audioButton").addEventListener("click",()=>{
 if(!("speechSynthesis" in window)){alert(UI_LOCALES[currentLanguage]?.audioUnsupported||"Audio narration is not supported in this browser.");return;}
 if(window.speechSynthesis.speaking){window.speechSynthesis.cancel();$("#audioButton").textContent=UI_LOCALES[currentLanguage]?.listen||"▶ Listen to overview";return;}
 const u=new SpeechSynthesisUtterance(`${selected.name}, on ${selected.island}. ${selected.summary}`);u.rate=.94;u.onend=()=>$("#audioButton").textContent=UI_LOCALES[currentLanguage]?.listen||"▶ Listen to overview";u.onerror=()=>$("#audioButton").textContent=UI_LOCALES[currentLanguage]?.listen||"▶ Listen to overview";$("#audioButton").textContent="■ Stop audio";window.speechSynthesis.speak(u);
});
$("#copyButton").addEventListener("click",async()=>{
 const value=`${selected.name}: ${coordsText(selected)}`;
 try{await navigator.clipboard.writeText(value);$("#copyButton").textContent=UI_LOCALES[currentLanguage]?.copied||"Copied ✓";setTimeout(()=>$("#copyButton").textContent=UI_LOCALES[currentLanguage]?.copyCoords||"Copy coordinates",1800);}
 catch(e){window.prompt(UI_LOCALES[currentLanguage]?.copyPrompt||"Copy these coordinates:",value);}
});
$("#menuToggle").addEventListener("click",()=>{const open=$("#mainNav").classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",String(open));});
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>{$("#mainNav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");}));
$("#year").textContent=new Date().getFullYear();
renderList();renderDetail();setupMap();
