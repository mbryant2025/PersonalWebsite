window.onload=function(){

    var recordBtn = document.getElementById("recordButton");
    recordBtn.addEventListener("click", showRecords);

    var recordBtn = document.getElementById("liveButton");
    recordBtn.addEventListener("click", showLive);

    var modal = document.getElementById("popup");
    var span = document.getElementsByClassName("close")[0];

    loadLiveAircraft();

    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }
      
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }

}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function showRecords() {
    document.getElementById("recordButton").classList.add('activatedButton');
    document.getElementById("recordButton").classList.remove('neutralButton');

    document.getElementById("liveButton").classList.add('neutralButton');
    document.getElementById("liveButton").classList.remove('activatedButton');

    loadRecordAircraft()
}

function showLive() {
    document.getElementById("liveButton").classList.add('activatedButton');
    document.getElementById("liveButton").classList.remove('neutralButton');

    document.getElementById("recordButton").classList.add('neutralButton');
    document.getElementById("recordButton").classList.remove('activatedButton');

    loadLiveAircraft()
}

function loadRecordAircraft() {

    var table = document.getElementById("table");

    table.innerHTML = "<tbody><tr><th>Record</th><th>Metric</th><th>Flight Number</th><th>Timestamp</th><th>Available on Map</th></tr><tr><td>Max Speed</td><td>748.9 mph</td><td>DAL185  </td><td>06/26/2022 15:10:23</td><td>Yes</td></tr><tr><td>Min Speed</td><td>1.2 mph</td><td>N145HH  </td><td>06/13/2022 17:18:40</td><td>Yes</td></tr><tr><td>Max Altitude</td><td>54875'</td><td>Unavailable</td><td>06/11/2022 09:36:28</td><td>No</td></tr><tr><td>Min Altitude</td><td>75'</td><td>Unavailable</td><td>06/06/2022 19:51:45</td><td>No</td></tr><tr><td>Max Distance</td><td>266.0509 miles</td><td>AFR027  </td><td>06/21/2022 22:29:31</td><td>Yes</td></tr><tr><td>Min Distance</td><td>0.0202 miles</td><td>N20272  </td><td>06/15/2022 18:17:54</td><td>Yes</td></tr></tbody></table>";

    
}

function loadLiveAircraft() {

    var table = document.getElementById("table");

    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    var headers = document.getElementsByTagName('th'); 
    headers[0].innerHTML = '#';
    headers[1].innerHTML = 'Flight Number';
    headers[2].innerHTML = 'Speed';
    headers[3].innerHTML = 'Altitude';
    headers[4].innerHTML = 'Available on Map';

    readTextFile("static-aircraft.json", function(text){
        var data = JSON.parse(text);
        var aircraft = data.data;

        for (let i = 0; i < aircraft.length; i++) {
            let row = table.insertRow(i+1);

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);

            let number = i+1;
            let flightNumber = aircraft[i].flight != null ? aircraft[i].flight : "Unavailable";
            let speed = aircraft[i].speed != null ? aircraft[i].speed : "Unavailable";
            let altitude = aircraft[i].alt != 'Unavailable' ? aircraft[i].alt + ' ft': "Unavailable";
            let availableOnMap = aircraft[i].pos != "" ? "Yes" : "No";

            cell1.innerHTML = number;
            cell2.innerHTML = flightNumber;
            cell3.innerHTML = speed;
            cell4.innerHTML = altitude;
            cell5.innerHTML = availableOnMap;

        }
    });

}
