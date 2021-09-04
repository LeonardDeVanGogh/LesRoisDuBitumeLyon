// Objet carte
// Récupère les infos de openstreetmap
// Dessine la carte
// ajoute les markers

let Carte = {

    lat:45.76178,
    lon:4.84847,
    zoomMap:11,
    init(){
        if(screen.width>1024){
            this.zoomMap = 13;
        }
        macarte = L.map('map').setView([this.lat, this.lon], this.zoomMap);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
            minZoom: 1,
            maxZoom: 20
        }).addTo(macarte);

        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=09ef0abca7b304a8116d31ea8a85ec8308d2f5cc", function (reponse) {
            
            let markers = L.markerClusterGroup();
            let stations = JSON.parse(reponse)
            let adresse = document.getElementById("stationAdresse");
            let places = document.getElementById("stationPlaces");    
            let nbVelo = document.getElementById("stationAvailableBikes");
            let signature = document.getElementById("signature");
            let station = document.getElementById("station");
            let reservation = document.getElementById("reservation");
            let confirmationReservation = document.getElementById("confirmationReservation");           
               
            for(i=0;i<stations.length;i++){

                let marker = new L.Marker([stations[i].position.lat,stations[i].position.lng]);
                marker.bindPopup(stations[i].name);

                let id = stations[i].number;
                let name = stations[i].name;
                let addr = stations[i].address;
                let plcs = stations[i].bike_stands;
                let velos = stations[i].available_bikes;
                let infos = document.getElementById('infos');

                marker.addEventListener("click", function (e) {
                    
                    signature.style.display = "none";
                    canvas.style.backgroundColor = "white";
                    infos.style.display = 'inline-block';
                    station.style.display = "block";
                    reservation.style.display = "block";
                    adresse.textContent = "Adresse : " + addr;
                    places.textContent = plcs + " places";
                    nbVelo.textContent = velos + " vélos disponibles";
                    if(velos===0){
                        nbVelo.style.backgroundColor = "red";
                    }
                    else{
                        nbVelo.style.backgroundColor = "transparent";
                    }

                    document.querySelector("#infos").scrollIntoView();
                    sessionStorage.setItem("id",id);
                    sessionStorage.setItem("nameStation",name);
                    sessionStorage.setItem("addresseStation",addr);
                    sessionStorage.setItem("placesStation",plcs);
                    sessionStorage.setItem("velosStation",velos);                
                });
                markers.addLayer(marker);
            }
            macarte.addLayer(markers); 
        });
    }
}