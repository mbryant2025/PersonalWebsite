let toggle = true;

window.onload=function(){

    var recordBtn = document.getElementById("recordButton");
    recordBtn.addEventListener("click", showRecords);

    var recordBtn = document.getElementById("liveButton");
    recordBtn.addEventListener("click", showLive);

    var modal = document.getElementById("popup");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }
      
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }

    loadLiveAircraft();

    // checkSwitch(); //Also checks screen size and displays message as necessary
    setTimeout(updateMap(), 5000);
}

function checkScreen() {
    
    if (window.innerWidth < 1200 || window.innerHeight < 900) {
        console.log("small");
        //to implement
    }

}

// function checkSwitch() {

//     checkScreen();

//     let found = false;
//     Array.from(document.querySelectorAll(":hover")).forEach(function(el) {
//         if (el.id == "map") {
//             found = true;
//         }
//     });

//     if (!found && toggle) {
//         document.getElementById("switch").checked = true;
//         toggle = false;
//     }

//     if (found) {
//         document.getElementById("switch").checked = false;
//         toggle = true;
//     }

//     setTimeout(checkSwitch, 500);

// }

function updateMap() {

    let found = false;
    Array.from(document.querySelectorAll(":hover")).forEach(function(el) {
        if (el.id == "map" || el.id == "iframe-container") {
            found = true;
        }
    });

    if (found) {
        setTimeout(function(){
            updateMap();
        }, 500);
        return;
    }

    var container = document.getElementById('iframe-container');

    var iframe2 = document.createElement('iframe');

    iframe2.src = "map.html";
    iframe2.width = "100%";
    iframe2.id = "map";
    iframe2.frameBorder = 0;
    iframe2.height = "600px";
    iframe2.style = "position:absloute; top:50px";


    iframe2.style.visibility = 'hidden';

    container.appendChild(iframe2);

    setTimeout(function(){  

        Array.from(document.querySelectorAll(":hover")).forEach(function(el) {
            if (el.id == "map" || el.id == "iframe-container") {
                container.removeChild(iframe2);
                return;
            }
        });
        
        // if (found || !document.getElementById("switch").checked) {
        //     container.removeChild(iframe2);
        //     return;
        // }

        iframe2.style.visibility = 'visible'; 

        container.removeChild(container.getElementsByTagName('iframe')[0]);
    }, 4000);


    setTimeout(updateMap, 5000);

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

    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    var headers = document.getElementsByTagName('th'); 
    headers[0].innerHTML = 'Record';
    headers[1].innerHTML = 'Metric';
    headers[2].innerHTML = 'Flight Number';
    headers[3].innerHTML = 'Timestamp';
    headers[4].innerHTML = 'Available on Map';

    readTextFile("records.json", function(text){
        var data = JSON.parse(text);

        for(let i = 0; i < 6; i++) {
            let row = table.insertRow(i+1);

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);

            let record = ""
            let metric = data[Object.keys(data)[i]][0];
            let flightNumber = data[Object.keys(data)[i]][2] != null ? data[Object.keys(data)[i]][2] : "Unavailable";
            let timestamp = data[Object.keys(data)[i]][3];
            let availableOnMap = data[Object.keys(data)[i]][4].length == 0 ? "No" : "Yes";

            if (i == 0) {
                record = "Max Speed";
                metric += " mph";
            }
            else if (i == 1) {
                record = "Min Speed";
                metric += " mph";
            }
            else if (i == 2) {
                record = "Max Altitude";
                metric += "'";
            }
            else if (i == 3) {
                record = "Min Altitude";
                metric += "'";
            }
            else if (i == 4) {
                record = "Max Distance";
                metric = Number(metric).toFixed(4);
                metric += " miles";
            }
            else if (i == 5) {
                record = "Min Distance";
                metric = Number(metric).toFixed(4);
                metric += " miles";
            }

            cell1.innerHTML = record;
            cell2.innerHTML = metric;
            cell3.innerHTML = flightNumber;
            cell4.innerHTML = timestamp;
            cell5.innerHTML = availableOnMap;
        }

    });

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

    readTextFile("aircraft.json", function(text){
        var data = JSON.parse(text);
        var aircraft = data.aircraft;

        for (let i = 0; i < aircraft.length; i++) {
            let row = table.insertRow(i+1);

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);

            let number = i+1;
            let flightNumber = aircraft[i].flight != null ? aircraft[i].flight : "Unavailable";
            let speed = aircraft[i].gs != null ? aircraft[i].gs + " mph" : "Unavailable";
            let altitude = aircraft[i].alt_geom != null ? aircraft[i].alt_geom + " ft" : "Unavailable";
            let availableOnMap = aircraft[i].lon != null ? "Yes" : "No";

            cell1.innerHTML = number;
            cell2.innerHTML = flightNumber;
            cell3.innerHTML = speed;
            cell4.innerHTML = altitude;
            cell5.innerHTML = availableOnMap;

        }
    });

}
