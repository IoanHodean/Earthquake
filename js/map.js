console.log (JSON.parse(window.localStorage.getItem("userlocation")));
console.log (JSON.parse(window.localStorage.getItem("earthquake")));
let userlocation=JSON.parse(window.localStorage.getItem("userlocation"));
let usr=Object.values(userlocation);
console.log(usr);
let lats=usr[0];
console.log(lats);
let long=usr[1];
let eq=JSON.parse(window.localStorage.getItem("earthquake"));



let map;

async function initMap() {
  // The location of me
  let lats=usr[0];
  let long=usr[1];
  const position = { lat: lats, lng: long };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at me
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "My Position",
  });

 for (var i=0;i<eq.length;i++){
 let earthq=eq[i];
 let marker=new google.maps.Marker({
  position:{lat:earthq.geometry.coordinates[1],lng:earthq.geometry.coordinates[0]},
  map,
  title:earthq.properties.place
 })
 marker.addListener("click",(event)=>{
  let popup=document.getElementById("popup");  
  popup.style.display="flex";
  popup.style["margin-left"]=event.domEvent.x-130+"px";
  popup.style["margin-top"]=event.domEvent.y-340+"px";
  console.log(event);
  console.log(earthq.properties.mag);
  console.log(earthq.properties.place);
  //
  var maaa=document.getElementById("dialog-body");
  maaa.innerHTML="";
  var date=new Date(earthq.properties.time);
  let magni=document.createElement("p");
  magni.innerHTML=`Magnitude: ${earthq.properties.mag} ML`;
  let status=document.createElement("p");
  status.innerHTML=`${date.toLocaleDateString("default")},${date.toLocaleTimeString("default")}`;
  let url=document.createElement("p");
  url.innerHTML=`<a href="${earthq.properties.url}">More details here.</a>`;
  maaa.appendChild(magni);
  maaa.appendChild(status);
  maaa.appendChild(url); 

 })
 } 
}

initMap();

function closePopup(){
   document.getElementById("popup").style.display="none";
  

}
