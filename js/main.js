async function getData(){

    // folosim functia fetch pentru a colecta date
    // fetch primeste un parametru, anume un URL  eg: https://google/cutremur... 
    
    navigator.geolocation.getCurrentPosition( result => kek(result), err => {
        alert(err);
    });
    
    }
    async function kek(result ){
        let latitude=0;
        let longitude=0;
        
        latitude = result.coords.latitude;
        longitude = result.coords.longitude;
    
        window.localStorage.setItem("userlocation",JSON.stringify({
            latitude:latitude, longitude:longitude}));
    console.log(latitude,longitude);
    }

    
    async function succes(){
    
       
        let userlocation=JSON.parse(window.localStorage.getItem("userlocation"));
        

        let latitude=userlocation.latitude;
        let longitude=userlocation.longitude;
        
        
       console.log(latitude, longitude);

        let maxRadiusInKm = document.getElementById("radius").value;
        let minMagnitude = document.getElementById("minmag").value;
        let maxDepth=document.getElementById("maxDepth").value;
        let startTime=document.getElementById("first").value;
        let endTime=document.getElementById("second-date").value;


        console.log(maxRadiusInKm, minMagnitude, maxDepth, startTime, endTime);
        

        let url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${maxRadiusInKm}&minmagnitude=${minMagnitude}&maxdepth=${maxDepth}&starttime=${startTime}&endtime=${endTime}`;
    
        let rawData = await fetch(url);
    
        let parsedData = await rawData.json();
       
    
        let listaCutremure = parsedData.features;
        window.localStorage.setItem("earthquake",JSON.stringify(listaCutremure));
    
        console.table(listaCutremure);
     
    let prins;
    for (let i=0;i<listaCutremure.length;i++){
        var place=listaCutremure[i].properties.place;
        var mag=listaCutremure[i].properties.mag;
        var time=listaCutremure[i].properties.time;
        var date=new Date(time);
       var timer=date.toLocaleDateString("default");
       var clock=date.toLocaleTimeString("default");
       
        console.log(mag,place,timer,clock);
        let line=mag+" ML, "+place+" at "+timer+" "+clock;
        console.log(line);
       var q=document.getElementById("quakes");
        q.innerHTML+=(line+"<br/>");  
       }    
      
    if (!q.isNull){
        document.getElementById("toMap").innerHTML=`<a href="map.html"> Show on map</a>`;
    }
    }
    

    
    // getData();

  function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
$ = function(id) {
    return document.getElementById(id);
  }
  
  var show = function(id) {
      $(id).style.display ='block';
  }
  var hide = function(id) {
      $(id).style.display ='none';
  }
  
  var myForm = document.getElementById("myForm");
      var result = document.getElementById("result");
      function submitForm(event) {
         event.preventDefault();
         myForm.submit();
         result.innerHTML = "<b>The button is pressed and form is submitted.</b>"
      }